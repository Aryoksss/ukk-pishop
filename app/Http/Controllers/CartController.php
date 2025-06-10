<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    //
    public function index(Request $request)
    {
        // Retrieve the cart items for the authenticated user
        $cartItems = $request->user()->cartItems()->with('product')->get();
        $userAddresses = $request->user()->addresses()->get();

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'addresses' => $userAddresses,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);
        $user = auth('web')->user();

        // Check if item already exists in cart
        $existingItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($existingItem) {
            $existingItem->update([
                'quantity' => $existingItem->quantity + $request->quantity
            ]);
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart');
    }

    public function getCartCount(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['items_count' => 0]);
        }

        $itemsCount = $user->cartItems()->sum('quantity');
        
        return response()->json(['items_count' => $itemsCount]);
    }
}
