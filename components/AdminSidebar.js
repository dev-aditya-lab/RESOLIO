'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Users,
    X
} from 'lucide-react';
import { useState, useEffect } from 'react';

const mainNavLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin#complaints', label: 'All Complaints', icon: FileText },
    { href: '/admin#analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin#users', label: 'Users', icon: Users },
];

const bottomNavLinks = [
    { href: '/admin#settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (onClose) {
            onClose();
        }
    }, [pathname]);

    // Prevent body scroll when mobile sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    bg-white border-r border-slate-200 flex flex-col transition-all duration-300
                    fixed lg:static inset-y-0 left-0 z-50
                    ${collapsed ? 'lg:w-20' : 'lg:w-64'}
                    ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0 w-72'}
                `}
            >
                {/* Header */}
                <div className={`p-5 border-b border-slate-100 ${collapsed && !isOpen ? 'lg:px-4' : ''}`}>
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="Resolvo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            {(!collapsed || isOpen) && (
                                <div>
                                    <span className="text-lg font-bold text-slate-900">Resolvo</span>
                                    <p className="text-xs text-slate-500">Admin Panel</p>
                                </div>
                            )}
                        </Link>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onClose}
                            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-1 px-3">
                        {mainNavLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href ||
                                (link.href !== '/admin' && pathname.startsWith(link.href));

                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                                            ${isActive
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                            }
                                        `}
                                        title={collapsed && !isOpen ? link.label : undefined}
                                    >
                                        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                        {(!collapsed || isOpen) && (
                                            <span className="text-sm font-medium">
                                                {link.label}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div className="my-4 mx-5 border-t border-slate-100" />

                    {/* Bottom Navigation */}
                    <ul className="space-y-1 px-3">
                        {bottomNavLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all"
                                        title={collapsed && !isOpen ? link.label : undefined}
                                    >
                                        <Icon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                                        {(!collapsed || isOpen) && (
                                            <span className="text-sm font-medium">
                                                {link.label}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Collapse Button - Desktop Only */}
                <div className="hidden lg:block px-3 py-2 border-t border-slate-100">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-5 w-5" />
                        ) : (
                            <>
                                <ChevronLeft className="h-5 w-5" />
                                <span className="text-sm">Collapse</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Exit Admin */}
                <div className="p-3 border-t border-slate-100">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-all"
                        title={collapsed && !isOpen ? 'Exit Admin' : undefined}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0 text-slate-400" />
                        {(!collapsed || isOpen) && (
                            <span className="text-sm font-medium">Exit Admin</span>
                        )}
                    </Link>
                </div>
            </aside>
        </>
    );
}
