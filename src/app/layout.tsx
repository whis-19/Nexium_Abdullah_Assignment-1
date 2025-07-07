import "../styles/globals.css";
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen text-gray-100">
                <div className="min-h-screen flex flex-col">
                    <header className="bg-gradient-to-r from-blue-800 to-purple-700 shadow-lg p-6 flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight drop-shadow-lg">Quote Generator</h1>
                        <span className="text-sm text-gray-200 italic hidden sm:block">Find inspiration by topic</span>
                    </header>
                    <main className="flex-grow flex items-center justify-center">
                        <div className="w-full max-w-xl bg-white/10 rounded-xl shadow-xl p-8 mt-8 mb-8 backdrop-blur-md border border-white/20">
                            {children}
                        </div>
                    </main>
                    <footer className="bg-gradient-to-r from-blue-800 to-purple-700 text-gray-200 p-4 text-center text-xs tracking-wide shadow-inner">
                        <p>&copy; {new Date().getFullYear()} Quote Generator &mdash; Made with <span className="text-pink-400">♥</span> for inspiration</p>
                    </footer>
                </div>
            </body>
        </html>
    );
};

export default Layout;