import { AppContent } from '@/components/app-content';
import { AppFooter } from '@/components/app-footer';
import { AppNavbar } from '@/components/app-nav';
import { AppShell } from '@/components/app-shell';
import { type PropsWithChildren } from 'react';

export default function AppNavLayout({ children }: PropsWithChildren) {
    return (
        <AppShell variant="header">
            <AppNavbar />
            <AppContent>{children}</AppContent>
            <AppFooter />
        </AppShell>
    );
}
