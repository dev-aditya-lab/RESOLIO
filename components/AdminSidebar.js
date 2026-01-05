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
    Users
} from 'lucide-react';
import { useState } from 'react';

const mainNavLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin#complaints', label: 'All Complaints', icon: FileText },
    { href: '/admin#analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin#users', label: 'Users', icon: Users },
];

const bottomNavLinks = [
    { href: '/admin#settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        bg-white border-r border-slate-200 flex flex-col transition-all duration-300
        ${collapsed ? 'w-20' : 'w-64'}
      `}
        >
            {/* Header */}
            <div className={`p-5 border-b border-slate-100 ${collapsed ? 'px-4' : ''}`}>
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="Resolvo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    {!collapsed && (
                        <div>
                            <span className="text-lg font-bold text-slate-900">Resolvo</span>
                            <p className="text-xs text-slate-500">Admin Panel</p>
                        </div>
                    )}
                </Link>
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
                                    className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                    ${isActive
                                            ? 'bg-teal-50 text-teal-700 border border-teal-100'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }
                  `}
                                    title={collapsed ? link.label : undefined}
                                >
                                    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                                    {!collapsed && (
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
                                    className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                                    title={collapsed ? link.label : undefined}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0 text-slate-400" />
                                    {!collapsed && (
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

            {/* Collapse Button */}
            <div className="px-3 py-2 border-t border-slate-100">
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
                    className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                    title={collapsed ? 'Exit Admin' : undefined}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0 text-slate-400" />
                    {!collapsed && (
                        <span className="text-sm font-medium">Exit Admin</span>
                    )}
                </Link>
            </div>
        </aside>
    );
}
