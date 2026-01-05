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
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin#complaints', label: 'All Complaints', icon: FileText },
    { href: '/admin#analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin#settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        bg-slate-900 text-white flex flex-col transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}
        >
            {/* Header */}
            <div className="p-4 border-b border-slate-700">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-9 h-9 flex-shrink-0">
                        <Image
                            src="/logo.png"
                            alt="Resolvo"
                            fill
                            className="object-contain rounded-lg"
                        />
                    </div>
                    {!collapsed && (
                        <div className="animate-fade-in">
                            <span className="text-lg font-bold">Resolvo</span>
                            <p className="text-xs text-slate-400">Admin Panel</p>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-2">
                    {sidebarLinks.map((link) => {
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
                                            ? 'bg-teal-600 text-white'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                        }
                  `}
                                    title={collapsed ? link.label : undefined}
                                >
                                    <Icon className="h-5 w-5 flex-shrink-0" />
                                    {!collapsed && (
                                        <span className="text-sm font-medium animate-fade-in">
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
            <div className="p-2 border-t border-slate-700">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
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

            {/* Footer / Logout */}
            <div className="p-2 border-t border-slate-700">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title={collapsed ? 'Exit Admin' : undefined}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    {!collapsed && (
                        <span className="text-sm font-medium">Exit Admin</span>
                    )}
                </Link>
            </div>
        </aside>
    );
}
