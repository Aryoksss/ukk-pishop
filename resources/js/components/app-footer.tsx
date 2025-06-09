export function AppFooter() {
    return (
        <footer className="border-t border-gray-200 dark:border-gray-700" style={{ background: '#DDD0C8' }}>
            <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-dark-300">
                    © {new Date().getFullYear()} Team 6. All rights reserved.
                </span>
                </div>
                <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500 dark:text-dark-300">Powered by</span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">Laravel</span>
                </div>
            </div>
            </div>
        </footer>
    );
}
