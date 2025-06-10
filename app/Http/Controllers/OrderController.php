<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Midtrans\Config;
use Midtrans\Snap;

class OrderController extends Controller
{
    //
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');
    }
    public function store(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:user_addresses,id',
            'total' => 'required|numeric|min:0',
            'cart_items' => 'required|array|exists:cart_items,id'
        ]);

        $address = auth('web')->user()->addresses()
            ->find($request->address_id)->first();

        // // Create the order
        // $order = $address->orders()->create([
        //     'total' => $request->total,
        // ]);
        $order = Order::create([
            'user_id' => auth('web')->id(),
            'total_amount' => $request->total,
            'shipping_address_line1' => $address->address_line1,
            'shipping_address_line2' => $address->address_line2,
            'shipping_city' => $address->city,
            'shipping_province' => $address->province,
            'shipping_postal_code' => $address->postal_code,
            'shipping_country' => $address->country,
            'status' => 'pending', // or any default status you want
        ]);

        // Attach the cart items to the order
        OrderItem::whereIn('id', $request->cart_items)->each(function ($item) use ($order) {
            $order->orderItems()->create([
                'product_id' => $item->product_id,
                'order_id' => $order->id,
                'quantity' => $item->quantity,
                'price' => $item->price,
            ]);
        });
        // Clear the cart items after placing the order
        auth('web')->user()->cartItems()->whereIn('id', $request->cart_items)->delete();

        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => $request->total,
            ],
            'customer_details' => [
                'first_name' => auth('web')->user()->name,
                'email' => auth('web')->user()->email,
            ],
            'item_details' => $order->orderItems->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'name' => $item->product->name,
                ];
            })->toArray(),
        ];

        $snapUrl = $this->createSnapUrl($params);
        return Inertia::location($snapUrl);
    }

    public function createSnapUrl($params)
    {
        return Snap::getSnapUrl($params);
    }
}
