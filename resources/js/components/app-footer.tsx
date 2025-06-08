export function AppFooter() {
    return (
        <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Team 6. All rights reserved.</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Powered by Laravel</span>
                </div>
            </div>
        </footer>
    );
}
