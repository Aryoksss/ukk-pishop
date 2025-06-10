import ProfileLayout from '@/layouts/profile/layout';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};
type OrderItem = {
    id: number;
    product: Product;
    quantity: number;
    price: number;
};

type Order = {
    id: number;
    order_items: OrderItem[];
    total_amount: number;
};

export default function OrderHistory({ orders }: { orders: Order[] }) {
    return (
        <ProfileLayout>
            <h1>Order History</h1>
            <div className="flex flex-col gap-2">
                {orders.map((order) => (
                    <div className="mb-4 rounded-lg border bg-gray-100 p-4" key={order.id}>
                        <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                        <div className="mt-2">
                            {order.order_items.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.product.name}</span>
                                    <span>
                                        {item.quantity} x Rp{item.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 border-t pt-2">
                            <span className="font-semibold">Total:</span> Rp
                            {order.total_amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                        </div>
                    </div>
                ))}
            </div>
        </ProfileLayout>
    );
}
