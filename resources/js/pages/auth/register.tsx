import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSimpleLayout from '@/layouts/auth/auth-simple-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthSimpleLayout title="Create account!" description="Buat akun untuk mendapatkan informasi dan notifikasi dari kami">
            <Head title="Register" />
            <form className="relative z-10 flex flex-col gap-4 rounded-lg bg-white/80 p-6 backdrop-blur-sm" onSubmit={submit}>
                <div className="grid gap-3">
                    <div className="grid gap-1">
                        <Label htmlFor="name" className="text-base font-medium text-gray-900">
                            Username
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            className="relative z-10 border-gray-300 text-gray-900 focus:border-indigo-500"
                            placeholder="username"
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="email" className="text-base font-medium text-gray-900">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                            className="relative z-10 border-gray-300 text-gray-900 focus:border-indigo-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="password" className="text-base font-medium text-gray-900">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="password"
                            className="relative z-10 border-gray-300 text-gray-900 focus:border-indigo-500"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-1">
                        <Label htmlFor="password_confirmation" className="text-base font-medium text-gray-900">
                            Confirm password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="password"
                            className="relative z-10 border-gray-300 text-gray-900 focus:border-indigo-500"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="relative z-10 mt-1 w-full bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Register
                    </Button>
                </div>

                <div className="text-center text-sm font-medium text-gray-900">
                    have an account?{' '}
                    <TextLink href={route('login')} tabIndex={6} className="font-medium text-indigo-600">
                        Sign In
                    </TextLink>
                </div>
            </form>
        </AuthSimpleLayout>
    );
}
