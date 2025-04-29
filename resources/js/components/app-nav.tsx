import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { Input } from './ui/input';

export function AppNavbar() {
    return (
        <nav className="flex items-center justify-between border-b border-black md:h-14 md:px-32">
            <div className="flex items-center gap-7">
                <div className="flex gap-8">
                    <Link href="#">
                        <h1 className="text-xl font-bold">Ecommerce</h1>
                    </Link>
                    <Link href="#">
                        <h1 className="">Produk</h1>
                    </Link>
                    <Link href="#">
                        <h1 className="">Kategori</h1>
                    </Link>
                    <Link href="#">
                        <h1 className="">About</h1>
                    </Link>
                </div>
                <Input className="border-border-primary rounded-full" placeholder="Search" />
            </div>
            <div className="flex gap-4">
                <Link href="#">
                    <h2 className="border-r-2 border-black px-4 text-base underline">Sign In</h2>
                </Link>
                <ShoppingCart />
            </div>
        </nav>
    );
}
