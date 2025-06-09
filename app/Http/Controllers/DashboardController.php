<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $latestProducts = Product::latest()
            ->take(5)
            ->get();

        $recommendedProducts = Product::withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->take(5)
            ->get();

        $mostOrderedProducts = Product::withSum('orderItems', 'quantity')
            ->orderBy('order_items_sum_quantity', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'latestProducts' => $latestProducts,
            'recommendedProducts' => $recommendedProducts,
            'mostOrderedProducts' => $mostOrderedProducts,
        ]);
    }

    public function guest(Request $request)
    {
        $latestProducts = Product::latest()
            ->take(5)
            ->get();

        $recommendedProducts = Product::with('reviews')
            ->whereHas('reviews', function ($query) {
                $query->where('rating', '>=', 4);
            })
            ->latest()
            ->take(5)
            ->get();

        $mostOrderedProducts = Product::withSum('orderItems', 'quantity')
            ->orderBy('order_items_sum_quantity', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'latestProducts' => $latestProducts,
            'recommendedProducts' => $recommendedProducts,
            'mostOrderedProducts' => $mostOrderedProducts,
        ]);
    }
}
