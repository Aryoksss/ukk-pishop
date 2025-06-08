<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    //
    public function index(Request $request)
    {
        // Retrieve the cart items for the authenticated user
        // $cartItems = $request->user()->cartItems()->with('product')->get();

        // Return the cart items to the view
        return Inertia::render('Cart');
    }
}
