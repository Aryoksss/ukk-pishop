import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import AppLayout from '../app-layout';


export default function ProfileLayout({ children }: PropsWithChildren) {
    const { props } = usePage<SharedData>();
    const user = props.auth.user;

    return (
        <AppLayout>
            <div className="flex min-h-[calc(95vh-120px)] w-full gap-4 p-4 overflow-hidden dark:text-black">
                <div className="flex flex-col rounded-md bg-gray-100 p-4 shadow-md">
                    <div className="flex w-64 items-center gap-4">
                        <Avatar className="size-12">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex h-full flex-col justify-between">
                        <div className="flex flex-col gap-2">
                            <label className="text-lg font-bold">Profil Saya</label>
                            <div className="flex flex-col gap-1 px-4">
                                <Link href="/profile" className="text-gray-700 hover:text-blue-500">
                                    Profil
                                </Link>
                                <Link href="/profile/address" className="text-gray-700 hover:text-blue-500">
                                    Alamat Saya
                                </Link>
                            </div>
                            <label className="text-lg font-bold">Pesanan</label>
                            <div className="flex flex-col gap-1 px-4">
                                <Link href="/profile/order" className="text-gray-700 hover:text-blue-500">
                                    Pesanan Saya
                                </Link>
                                <Link href="/profile/review" className="text-gray-700 hover:text-blue-500">
                                    Review Saya
                                </Link>
                            </div>
                        </div>
                        <Link href="#">
                            <Button
                                className="w-full"
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.post(route('logout'));
                                }}
                                variant={'destructive'}
                            >
                                Keluar
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex-1 rounded-md bg-gray-100 p-4 shadow-md">{children}</div>
            </div>
        </AppLayout>
    );
}
