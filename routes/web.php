<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Product;
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
    Route::put('profile/address/{id}', [ProfileController::class, 'updateAddress'])->name('profile.address.update');

    Route::get('product/{id}', [ProductController::class, 'show'])->name('product.show');
    Route::post('cart/store', [CartController::class, 'store'])->name('cart.store');
});

require __DIR__ . '/auth.php';
