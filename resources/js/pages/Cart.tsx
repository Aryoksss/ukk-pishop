import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    stock: number;
}

interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    product: Product;
    quantity: number;
    created_at: string;
    updated_at: string;
}

type Address = {
    id: number;
    address_line1: string;
    address_line2?: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
};

type OrderForm = {
    address_id: number | undefined;
    cart_items: number[];
    total: number;
};

export default function Cart({ cartItems: initialCartItems, addresses }: { cartItems: CartItem[]; addresses: Address[] }) {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const { data, setData, post } = useForm<OrderForm>({
        address_id: undefined,
        cart_items: [],
        total: selectedItems.reduce((total, id) => {
            const item = cartItems.find((item) => item.product.id === id);
            return total + (item ? item.product.price * item.quantity : 0);
        }, 0),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post(route('order.store'));
    };

    useEffect(() => {
        const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.product.id));
        const total = selectedCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        setData((prev) => ({
            ...prev,
            cart_items: selectedCartItems.map((item) => item.id),
            total: total,
        }));
    }, [selectedItems, cartItems, setData]);

    return (
        <AppLayout>
            <div className="p-4 py-8">
                <h1 className="text-2xl">Keranjang</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mt-2 grid gap-4 md:grid-cols-4">
                        <div className="col-span-3">
                            <div className="grid gap-4">
                                <div className="flex items-center gap-4 rounded-md border border-[#323232] p-4">
                                    <Checkbox
                                        className="border-[#323232]"
                                        checked={selectedItems.length === cartItems.length}
                                        onCheckedChange={() => {
                                            if (selectedItems.length === cartItems.length) {
                                                setSelectedItems([]);
                                            } else {
                                                setSelectedItems(cartItems.map((item) => item.product.id));
                                            }
                                        }}
                                    />
                                    <h2 className="text-lg font-semibold">Pilih Semua</h2>
                                </div>
                                {cartItems.length > 0 ? (
                                    cartItems.map((item) => (
                                        <div key={item.product.id} className="flex items-center gap-4 rounded-md bg-white p-4">
                                            <Checkbox
                                                disabled={item.product.stock === 0}
                                                className="border-[#323232]"
                                                checked={selectedItems.includes(item.product.id)}
                                                onCheckedChange={() => {
                                                    setSelectedItems((prev) =>
                                                        prev.includes(item.product.id)
                                                            ? prev.filter((id) => id !== item.product.id)
                                                            : [...prev, item.product.id],
                                                    );
                                                }}
                                            />
                                            <img
                                                src={item.product.image || 'placeholder.jpg'}
                                                alt={item.product.name}
                                                className="h-16 w-16 rounded-md"
                                            />
                                            <div className="flex w-full justify-between">
                                                <div className="flex flex-col">
                                                    <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                                    <p className="text-sm text-gray-500">
                                                        {item.product.price.toLocaleString('id-ID', {
                                                            style: 'currency',
                                                            currency: 'IDR',
                                                        })}
                                                    </p>
                                                    {item.product.stock === 0 ? <span className="text-red-500">Stok Habis</span> : null}
                                                </div>
                                                <div className="flex flex-col">
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max={item.product.stock}
                                                        value={item.quantity}
                                                        onChange={(e) => {
                                                            const newQuantity = Math.max(1, Math.min(item.product.stock, Number(e.target.value)));
                                                            setCartItems((prev) =>
                                                                prev.map((i) =>
                                                                    i.product.id === item.product.id ? { ...i, quantity: newQuantity } : i,
                                                                ),
                                                            );
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
                        <div className="flex h-fit flex-col gap-2 rounded-md bg-white p-4">
                            <h1 className="pb-2 text-xl font-semibold">Ringkasan Belanja</h1>
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-sm font-semibold">
                                    {selectedItems
                                        .reduce((total, id) => {
                                            const item = cartItems.find((item) => item.product.id === id);
                                            return total + (item ? item.product.price * item.quantity : 0);
                                        }, 0)
                                        .toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                </p>
                            </div>
                            <Select
                                value={data.address_id?.toString()}
                                onValueChange={(value) => {
                                    setData('address_id', value ? parseInt(value) : undefined);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Lokasi" />
                                </SelectTrigger>
                                <SelectContent>
                                    {addresses.map((address) => (
                                        <SelectItem value={address.id.toString()} key={address.id}>
                                            {address.address_line1}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="mt-4">
                                <button className="w-full rounded-md bg-[#DDD0C8] px-4 py-2 hover:bg-[#C8BEBE]">Checkout</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
