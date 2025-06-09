<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Product::insert([
            [
                'name' => 'Nova Pro',
                'description' => 'Nova Pro Mouse Gaming Wireless with PAW3311 Sensor, best for mid range and low latency gaming.',
                'price' => 300000,
                'category_id' => 1, // Mouse category
                'stock' => 5,
                'image' => 'storage/novapro-square.jpg'
            ],
            [
                'name' => 'Lamzu Maya X',
                'description' => 'Lamzu Maya X 8k Wireless Ultra Light Ambidextrous Gaming Mouse, with PAW3950 Sensor Up to 30000 DPI. Best for competitive gaming.',
                'price' => 750000,
                'category_id' => 1, // Mouse category
                'stock' => 5,
                'image' => 'storage/lamzumayax-square.jpg'
            ],
            [
                'name' => 'Scyrox V6',
                'description' => 'Scyrox V6 Low Latency Mouse',
                'price' => 700000,
                'category_id' => 1, // Mouse category
                'stock' => 5,
                'image' => 'storage/scyroxv6-square.jpg'
            ],
            [
                'name' => 'Vortexseries Mono Keyboard',
                'description' => 'Vortexseries Mono Keyboard with 65% layout, RGB, and PBT keycaps. Best for gaming and typing.',
                'price' => 300000,
                'category_id' => 2, // Keyboard category
                'stock' => 5,
                'image' => 'storage/monokeyboard-square.jpg'
            ],
            [
                'name' => 'Deskmat MP905',
                'description' => 'MP905 Deskmat with 900x400mm size, best for gaming and typing. Alia Adelia Edition.',
                'price' => 150000,
                'category_id' => 3, // Deskmat category
                'stock' => 5,
                'image' => 'storage/deskmatmp905-square.jpg'
            ]
        ]);
    }
}
