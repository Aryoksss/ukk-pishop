import { SharedData } from '@/types';
import { Button } from '@headlessui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { CircleUser, ShoppingCart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function AppNavbar() {
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    const handleLogout = () => {
        router.post(route('logout'));
    };
    return (
        <nav className="flex items-center justify-between border-b border-black px-24 md:h-14">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <img src="/images/setuply.png" alt="Logo" className="object-cover md:h-12 md:w-12 lg:h-18 lg:w-16" />
                </Link>
                <Link href="#" className="dark:text-black">
                    <h1 className="">Produk</h1>
                </Link>
            </div>
            {/* <div className="flex items-center justify-center flex-1">
                <Input className="border-border-primary w-sm rounded-full placeholder:text-center" placeholder="Search" />
            </div> */}
            <div className="flex gap-4 dark:text-black">
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-2 p-2">
                            <CircleUser />
                            {user.name}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href="/profile">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                            </Link>
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
                        <h2 className="p-2 px-4 text-base dark:text-black">Sign in</h2>
                    </Link>
                )}
                <div className="flex items-center p-2 dark:text-black">
                    <Link href="/cart" className="flex items-center gap-2 relative">
                        <ShoppingCart />
                        {props.cart?.items_count && props.cart.items_count > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {props.cart.items_count}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
