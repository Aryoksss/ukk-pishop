<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::middleware(['guest'])->group(function () {
    Route::get('/', [DashboardController::class, 'guest'])->name('home');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('cart', [CartController::class, 'index'])->name('cart');

    Route::get('profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('profile/address', [ProfileController::class, 'address'])->name('profile.address');
    Route::post('profile/address', [ProfileController::class, 'storeAddress'])->name('profile.address.store');
});

require __DIR__ . '/auth.php';
