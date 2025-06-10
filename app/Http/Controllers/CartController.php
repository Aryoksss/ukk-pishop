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

        // Logic to add the product to the cart
        CartItem::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);

        return redirect()->back()->with('success', 'Product added to cart');
    }
}
