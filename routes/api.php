<?php

use App\Http\Controllers\PaymentController;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('payment-notification', [PaymentController::class, 'handleWebhook'])->name('payment.notification');
