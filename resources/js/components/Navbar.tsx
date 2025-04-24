import { Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AppProps {
    auth: {
        user: User | null;
    };
    [key: string]: any;
}

const Navbar: React.FC = () => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const { auth } = usePage<AppProps>().props;
    const isLoggedIn = auth.user !== null;

    // Add CSS to hide scrollbar when component mounts
    useEffect(() => {
        // Create a global style to hide scrollbars
        const style = document.createElement('style');
        style.innerHTML = `
            html, body {
                overflow-x: hidden;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
                font-family: 'Inter', 'Helvetica', sans-serif;
                height: 100%;
                position: relative;
            }
            
            /* Hide scrollbar for Chrome, Safari and Opera */
            html::-webkit-scrollbar,
            body::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
            }
            
            /* Hide all scrollbars in the document */
            ::-webkit-scrollbar {
                display: none;
                width: 0px;
                background: transparent;
            }
            
            * {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }
            
            /* Load fonts */
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
            
            h1, h2, h3, h4, h5, h6 {
                font-family: 'Playfair Display', serif;
            }
            
            /* Ensure the navbar sticks properly */
            .sticky-navbar {
                position: sticky;
                top: 0;
                z-index: 50;
                will-change: transform;
                transition: transform 0.3s ease-in-out;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return (
        <div className="w-full">
            {/* Top Utility Bar */}
            <div className="bg-gray-100 py-2">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-end text-sm font-medium">
                        {isLoggedIn ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/dashboard" className="text-gray-700 hover:text-gray-900">
                                    Dashboard
                                </Link>
                                <span className="text-gray-400">|</span>
                                <Link href="/logout" method="post" as="button" className="text-gray-700 hover:text-gray-900">
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-gray-900">
                                    Login
                                </Link>
                                <span className="text-gray-400">|</span>
                                <Link href="/register" className="text-gray-700 hover:text-gray-900">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar - Sticky */}
            <nav className="sticky-navbar bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold tracking-tight text-black">
                                PISHOP
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-6">
                                <Link href="/products" className="font-medium text-gray-700 hover:text-gray-900">
                                    Products
                                </Link>
                                <div className="relative">
                                    <button
                                        className="inline-flex items-center font-medium text-gray-700 hover:text-gray-900"
                                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                                        onBlur={() => setTimeout(() => setIsCategoriesOpen(false), 200)}
                                        title="Toggle categories menu"
                                    >
                                        Categories
                                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    {isCategoriesOpen && (
                                        <div className="ring-opacity-5 absolute left-0 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black">
                                            <Link href="/categories/keyboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">⌨️</span>
                                                    <span className="font-medium">Keyboard</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/deskmat" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🔲</span>
                                                    <span className="font-medium">Deskmat</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/keycaps" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🎯</span>
                                                    <span className="font-medium">Keycaps</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/coiled-cable" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🔌</span>
                                                    <span className="font-medium">Coiled Cable</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/mouse" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🖱️</span>
                                                    <span className="font-medium">Mouse</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/switch" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🔘</span>
                                                    <span className="font-medium">Switch</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/sticker" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">🏷️</span>
                                                    <span className="font-medium">Sticker</span>
                                                </div>
                                            </Link>
                                            <Link href="/categories/barebone" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-lg">⚙️</span>
                                                    <span className="font-medium">Barebone</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                                <Link href="/blog" className="font-medium text-gray-700 hover:text-gray-900">
                                    Blog
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-gray-900"
                                onClick={() => {
                                    /* Add mobile menu logic here */
                                }}
                                title="Toggle mobile menu"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="mx-4 hidden max-w-xl flex-1 md:block">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-blue-500 focus:outline-none"
                                    placeholder="Search Products"
                                />
                                <div className="absolute top-2.5 left-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-700 hover:text-gray-900" title="Wishlist">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                            <button className="text-gray-700 hover:text-gray-900" title="Shopping Cart">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
