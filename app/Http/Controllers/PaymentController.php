<?php

namespace App\Http\Controllers;

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

        return response()->json(['status' => 'success'], 200);
    }

    public function success(Request $request)
    {
        return inertia('payment/success', [
            'message' => 'Payment successful!',
        ]);
    }
}
