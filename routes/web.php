<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('/', [DashboardController::class, 'guest'])->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('cart', [App\Http\Controllers\CartController::class, 'index'])->name('cart');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
