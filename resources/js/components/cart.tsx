import { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

export function Cart() {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Monoseries',
            price: 100000,
            image: 'monoseries.jpg',
            quantity: 1,
            stock: 10,
        },
        {
            id: 2,
            name: 'Another Product',
            price: 200000,
            image: '',
            quantity: 1,
            stock: 5,
        },
        {
            id: 3,
            name: 'Third Product',
            price: 150000,
            image: 'third-product.jpg',
            quantity: 1,
            stock: 0, // Out of stock
        },
        {
            id: 4,
            name: 'Fourth Product',
            price: 300000,
            image: 'fourth-product.jpg',
            quantity: 1,
            stock: 2,
        },
    ]);

    return (
        <div className="p-4 py-8">
            <h1 className="text-2xl">Keranjang</h1>
            <div className="mt-2 grid gap-4 md:grid-cols-4">
                <div className="col-span-3">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4 rounded-md border border-[#323232] p-4">
                            <Checkbox className="border-[#323232]" />
                            <h2 className="text-lg font-semibold">Pilih Semua</h2>
                        </div>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 rounded-md bg-white p-4">
                                    <Checkbox
                                        disabled={item.stock === 0}
                                        className="border-[#323232]"
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={() => {
                                            setSelectedItems((prev) =>
                                                prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id],
                                            );
                                        }}
                                    />
                                    <img src={item.image || 'placeholder.jpg'} alt={item.name} className="h-16 w-16 rounded-md" />
                                    <div className="flex w-full justify-between">
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p className="text-sm text-gray-500">
                                                {item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                            </p>
                                            {item.stock === 0 ? <span className="text-red-500">Stok Habis</span> : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <Input
                                                type="number"
                                                min="1"
                                                max={item.stock}
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = Math.max(1, Math.min(item.stock, Number(e.target.value)));
                                                    setCartItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, quantity: newQuantity } : i)));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-center rounded-md bg-white p-4">
                                <p className="text-lg font-semibold">Keranjang Anda kosong</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-fit rounded-md bg-white p-4">
                    <h1 className="pb-2 text-xl font-semibold">Ringkasan Belanja</h1>
                    <div className="flex justify-between">
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-sm font-semibold">
                            {selectedItems
                                .reduce((total, id) => {
                                    const item = cartItems.find((item) => item.id === id);
                                    return total + (item ? item.price * item.quantity : 0);
                                }, 0)
                                .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </p>
                    </div>
                    <div className="mt-4">
                        <button className="w-full rounded-md bg-[#DDD0C8] px-4 py-2 hover:bg-[#C8BEBE]">Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
