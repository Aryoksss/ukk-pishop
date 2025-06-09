<?php

namespace App\Http\Controllers;

use App\Models\Product;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function index()
    {
        // Logic to list all products
    }

    public function show($id)
    {
        $recommendedProducts = Product::withAvg('reviews', 'rating')
            ->orderByDesc('reviews_avg_rating')
            ->take(5)
            ->get();

        $product = Product::with(['category', 'reviews', 'orderItems'])->findOrFail($id);

        $orderCount = $product->orderItems->sum('quantity');
        $avgReviews = number_format($product->reviews->avg('rating'), 1);

        return inertia('product/show', [
            'product' => $product,
            'order_count' => $orderCount,
            'avg_reviews' => $avgReviews,
            'recommendedProducts' => $recommendedProducts
        ]);
    }
}
