import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { router, useForm } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Category {
    name: string;
}

interface Product {
    id: number;
    name: string;
    category: Category;
    price: number;
    stock: number;
    description: string;
    image: string;
}

type CartForm = {
    product_id: number | undefined;
    quantity: number;
};

export default function ProductShow({
    product,
    order_count,
    avg_reviews,
    recommendedProducts,
}: {
    product: Product;
    order_count: number;
    avg_reviews: number;
    recommendedProducts: Product[];
}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data, setData, post } = useForm<CartForm>({
        product_id: undefined,
        quantity: 1,
    });

    const handleProductClick = (id: number) => {
        console.log(`Navigating to product with ID: ${id}`);
        router.visit(route('product.show', { id }));
    };

    const handleAddToCart = (id: number) => {
        setData('product_id', id);
        post(route('cart.store'), {
            onSuccess: () => {
                setSuccess(true);
            },
            onError: (error) => {
                setError(error.message);
            },
        });
    };

    return (
        <AppLayout>
            {error && (
                <div className="mb-4">
                    <InputError message={error} />
                </div>
            )}

            {success && <div className="mt-2 rounded-md bg-green-200 p-4 text-green-600">Produk berhasil ditambahkan ke keranjang.</div>}
            <div className="flex min-h-[calc(100vh-130px)] flex-col justify-evenly p-4">
                <div className="flex justify-center gap-4 p-4">
                    <img src={`/${product.image}`} alt={product.name} className="h-fit w-fit rounded-md shadow-md" />
                    <div className="shadow-3xl flex w-2xl flex-col gap-1 rounded-md bg-gray-100 p-4">
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <div className="flex gap-2">
                            Terjual: {order_count} Rating: {avg_reviews}
                        </div>
                        <h1 className="text-2xl font-bold">Rp{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</h1>
                        <h4 className="text-sm text-gray-500">Stok: {product.stock}</h4>
                        <h3 className="mt-4 text-lg font-semibold">Detail Produk</h3>
                        <Separator />
                        <p className="text-gray-700">{product.description}</p>
                        <div className="flex flex-col">
                            <Input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={data.quantity}
                                onChange={(e) => {
                                    const newQuantity = Math.max(1, Math.min(product.stock, Number(e.target.value)));
                                    setData('quantity', newQuantity);
                                }}
                                className="w-fit"
                            />
                        </div>
                        <div className="mt-6 flex">
                            <button
                                className="flex cursor-pointer items-center gap-2 rounded-md bg-stone-400 px-4 py-2 text-white hover:bg-stone-600"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                <ShoppingCart /> Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="self-start text-lg">Rekomendasi Produk</h3>
                    <div className="grid w-full grid-cols-5 gap-4">
                        {recommendedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative aspect-square cursor-pointer rounded-md shadow-md transition-all"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <img src={`/${product.image}`} alt={product.name} className="h-full w-full" />
                                <div className="bg-opacity-30 absolute inset-0 bg-zinc-900/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
