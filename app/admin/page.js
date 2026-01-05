'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ComplaintTable from '@/components/ComplaintTable';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { getStatistics } from '@/lib/mockData';
import { getFilteredComplaints } from '@/lib/mockServices';
import {
    BarChart3,
    AlertTriangle,
    Clock,
    CheckCircle,
    Search,
    RefreshCw
} from 'lucide-react';

const priorityFilters = [
    { id: 'ALL', label: 'All' },
    { id: 'HIGH', label: 'High' },
    { id: 'MEDIUM', label: 'Medium' },
    { id: 'LOW', label: 'Low' },
];

const statusFilters = [
    { id: 'ALL', label: 'All Status' },
    { id: 'PENDING', label: 'Pending' },
    { id: 'REVIEWED', label: 'Reviewed' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'RESOLVED', label: 'Resolved' },
];

export default function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState('ALL');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, highPriority: 0, pending: 0, resolved: 0 });

    useEffect(() => {
        setIsLoading(true);

        setTimeout(() => {
            const filtered = getFilteredComplaints({
                priority: priorityFilter,
                status: statusFilter,
                sortByPriority: true,
            });

            let finalFiltered = filtered;
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                finalFiltered = filtered.filter(c =>
                    c.studentName.toLowerCase().includes(query) ||
                    c.complaintText.toLowerCase().includes(query) ||
                    c.id.toLowerCase().includes(query)
                );
            }

            setComplaints(finalFiltered);
            setStats(getStatistics());
            setIsLoading(false);
        }, 300);
    }, [priorityFilter, statusFilter, searchQuery]);

    const handleStatusUpdate = (complaintId, newStatus) => {
        setComplaints(prev =>
            prev.map(c => c.id === complaintId ? { ...c, status: newStatus } : c)
        );
        setStats(getStatistics());
    };

    const statCards = [
        {
            label: 'Total Complaints',
            value: stats.total,
            icon: BarChart3,
            iconColor: 'text-slate-600',
            bgColor: 'bg-slate-100',
        },
        {
            label: 'High Priority',
            value: stats.highPriority,
            icon: AlertTriangle,
            iconColor: 'text-red-600',
            bgColor: 'bg-red-50',
        },
        {
            label: 'Pending',
            value: stats.pending,
            icon: Clock,
            iconColor: 'text-amber-600',
            bgColor: 'bg-amber-50',
        },
        {
            label: 'Resolved',
            value: stats.resolved,
            icon: CheckCircle,
            iconColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AdminSidebar />

            <main className="flex-1 overflow-auto">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-8 py-6">
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage student complaints</p>
                </div>

                <div className="p-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {statCards.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="bg-white rounded-xl p-5 border border-slate-200"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                            <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-slate-900">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6" id="complaints">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search complaints..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                                />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-3">
                                {/* Priority Filter */}
                                <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                                    {priorityFilters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => setPriorityFilter(filter.id)}
                                            className={`px-3 py-2 text-sm font-medium transition-colors ${priorityFilter === filter.id
                                                    ? 'bg-slate-900 text-white'
                                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Status Filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-slate-400 bg-white"
                                >
                                    {statusFilters.map(filter => (
                                        <option key={filter.id} value={filter.id}>
                                            {filter.label}
                                        </option>
                                    ))}
                                </select>

                                {/* Reset */}
                                <button
                                    onClick={() => {
                                        setPriorityFilter('ALL');
                                        setStatusFilter('ALL');
                                        setSearchQuery('');
                                    }}
                                    className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
                                    title="Reset filters"
                                >
                                    <RefreshCw className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(priorityFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                <span className="text-sm text-slate-500">Filters:</span>
                                {priorityFilter !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                        {priorityFilter}
                                        <button onClick={() => setPriorityFilter('ALL')}>×</button>
                                    </span>
                                )}
                                {statusFilter !== 'ALL' && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                        {statusFilter}
                                        <button onClick={() => setStatusFilter('ALL')}>×</button>
                                    </span>
                                )}
                                {searchQuery && (
                                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                        "{searchQuery}"
                                        <button onClick={() => setSearchQuery('')}>×</button>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-600">
                            <span className="font-semibold">{complaints.length}</span> complaints
                        </p>
                        <p className="text-sm text-slate-400">
                            Sorted by priority
                        </p>
                    </div>

                    {/* Complaints */}
                    {isLoading ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <div className="spinner mx-auto mb-4" />
                            <p className="text-slate-500">Loading...</p>
                        </div>
                    ) : (
                        <ComplaintTable
                            complaints={complaints}
                            onComplaintClick={setSelectedComplaint}
                        />
                    )}
                </div>
            </main>

            {selectedComplaint && (
                <ComplaintDetailModal
                    complaint={selectedComplaint}
                    onClose={() => setSelectedComplaint(null)}
                    onStatusUpdate={handleStatusUpdate}
                />
            )}
        </div>
    );
}
