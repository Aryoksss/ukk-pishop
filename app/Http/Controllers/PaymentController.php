<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //
    public function handleWebhook(Request $request)
    {
        // Validate the request
        $request->validate([
            'transaction_status' => 'required|string',
            'order_id' => 'required|string',
            'payment_type' => 'required|string',
            'gross_amount' => 'required|numeric',
        ]);

        $order = Order::findOrFail($request->order_id);
        // Update the order status based on the transaction status
        $order->status = $request->transaction_status;
        $order->save();

        $payment = Payment::create([
            'order_id' => $order->id,
            'payment_type' => $request->payment_type,
            'amount' => $request->gross_amount,
            'status' => $request->transaction_status,
            'paid_at' => $request->transaction_status === 'settlement' ? now() : null,
        ]);

        return response()->json(['status' => 'success'], 200);
    }

    public function success(Request $request)
    {
        return inertia('payment/success', [
            'message' => 'Payment successful!',
        ]);
    }
}
