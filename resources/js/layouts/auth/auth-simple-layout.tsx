import AppLogoIcon from '@/components/app-logo-icon';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="fixed inset-0 flex bg-white">
            <Head>
                <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/canela" />
                <style>{`
                    .font-canela-medium-italic {
                        font-family: 'Canela', serif;
                        font-style: italic;
                        font-weight: 500;
                    }
                `}</style>
            </Head>

            {/* Back button */}
            <Link href={route('home')} className="absolute top-4 left-4 flex items-center gap-1 text-gray-500 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm">Back</span>
            </Link>

            {/* Left side - Form - smaller portion */}
            <div className="flex w-full flex-col items-center justify-center overflow-auto px-6 py-8 md:w-1/3">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                    <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="font-canela-medium-italic text-3xl text-gray-900">{title}</h1>
                                <p className="text-center text-sm font-medium text-gray-700">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            {/* Right side - Image - larger portion */}
            <div className="hidden md:block md:w-2/3">
                <img
                    src="https://i.pinimg.com/736x/c9/f4/f7/c9f4f758c96e686353ee39d3fb7936cb.jpg?w=800&auto=format&fit=crop"
                    alt="Auth background"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}
