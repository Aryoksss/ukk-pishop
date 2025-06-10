<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\UserAddress;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('profile/index', [
            'user' => $request->user(),
        ]);
    }

    public function orderHistory(Request $request)
    {
        //get product from orderitems
        $userOrders = $request->user()->orders()->with('orderItems.product')->get();

        return inertia('profile/order-history', [
            'user' => $request->user(),
            'orders' => $userOrders,
        ]);
    }
    public function address(Request $request)
    {
        $userAddresses = $request->user()->addresses()->get();
        return inertia('profile/address', [
            'user' => $request->user(),
            'addresses' => $userAddresses,
        ]);
    }

    public function storeAddress(Request $request)
    {
        $request->validate([
            'line1' => 'required|string',
            'line2' => 'nullable|string',
            'city' => 'required|string',
            'province' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
        ]);

        UserAddress::create([
            'user_id' => $request->user()->id,
            'address_line1' => $request->line1,
            'address_line2' => $request->line2,
            'city' => $request->city,
            'province' => $request->province,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
        ]);

        return redirect()->back()->with('success', 'Address added successfully.');
    }

    public function updateAddress(Request $request, $id)
    {
        $request->validate([
            'line1' => 'required|string',
            'line2' => 'nullable|string',
            'city' => 'required|string',
            'province' => 'required|string',
            'postal_code' => 'required|string',
            'country' => 'required|string',
        ]);

        $address = UserAddress::findOrFail($id);
        $address->update([
            'address_line1' => $request->line1,
            'address_line2' => $request->line2,
            'city' => $request->city,
            'province' => $request->province,
            'postal_code' => $request->postal_code,
            'country' => $request->country,
        ]);

        return redirect()->back()->with('success', 'Address updated successfully.');
    }
}
