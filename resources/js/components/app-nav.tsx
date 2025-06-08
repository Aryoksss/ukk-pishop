import { SharedData } from '@/types';
import { Button } from '@headlessui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, ShoppingCart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';

export function AppNavbar() {
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };
    return (
        <nav className="flex items-center justify-between border-b border-black px-24 md:h-14">
            <div className="flex items-center gap-8">
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
                <Input className="border-border-primary w-sm rounded-full placeholder:text-center 2xl:ms-64" placeholder="Search" />
            </div>
            <div className="flex gap-4">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 p-2">
                            <CircleUser />
                            {user.name}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogout();
                                    }}
                                >
                                    Logout
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Link href="/login">
                        <h2 className="p-2 px-4 text-base">Sign in</h2>
                    </Link>
                )}
                <div className="flex items-center p-2">
                    <ShoppingCart />
                </div>
            </div>
        </nav>
    );
}
