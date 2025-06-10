import AppLayout from '@/layouts/app-layout';

export default function PaymentSuccess() {
    return (
        <AppLayout>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
                <div className="rounded-lg bg-white p-8 text-center shadow-md">
                    <h1 className="mb-4 text-2xl font-bold">Payment Successful!</h1>
                    <p className="mb-6 text-gray-700">Thank you for your purchase. Your order has been successfully processed.</p>
                    <a href={route('home')} className="text-blue-500 hover:underline">
                        Return to Home
                    </a>
                </div>
            </div>
        </AppLayout>
    );
}
