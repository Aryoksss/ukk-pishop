import AppLayoutTemplate from '@/layouts/app/app-nav-layout';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <>
        <Head>
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <AppLayoutTemplate {...props}>{children}</AppLayoutTemplate>
    </>
);
