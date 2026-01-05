'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import ComplaintTable from '@/components/ComplaintTable';
import ComplaintDetailModal from '@/components/ComplaintDetailModal';
import { mockComplaints, getStatistics, PRIORITY_LEVELS, STATUS_TYPES } from '@/lib/mockData';
import { getFilteredComplaints } from '@/lib/mockServices';
import {
    BarChart3,
    AlertTriangle,
    Clock,
    CheckCircle,
    Filter,
    Search,
    RefreshCw,
    TrendingUp
} from 'lucide-react';

const priorityFilters = [
    { id: 'ALL', label: 'All Priorities' },
    { id: 'HIGH', label: 'High', color: 'text-red-600 bg-red-50 border-red-200' },
    { id: 'MEDIUM', label: 'Medium', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'LOW', label: 'Low', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
];

const statusFilters = [
    { id: 'ALL', label: 'All Statuses' },
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

    // Load and filter complaints
    useEffect(() => {
        setIsLoading(true);

        // Simulate loading
        setTimeout(() => {
            const filtered = getFilteredComplaints({
                priority: priorityFilter,
                status: statusFilter,
                sortByPriority: true,
            });

            // Apply search filter
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

    // Handle status update from modal
    const handleStatusUpdate = (complaintId, newStatus) => {
        // Update the local state
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
            color: 'bg-blue-500',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-600'
        },
        {
            label: 'High Priority',
            value: stats.highPriority,
            icon: AlertTriangle,
            color: 'bg-red-500',
            bgColor: 'bg-red-100',
            textColor: 'text-red-600'
        },
        {
            label: 'Pending Review',
            value: stats.pending,
            icon: Clock,
            color: 'bg-amber-500',
            bgColor: 'bg-amber-100',
            textColor: 'text-amber-600'
        },
        {
            label: 'Resolved',
            value: stats.resolved,
            icon: CheckCircle,
            color: 'bg-emerald-500',
            bgColor: 'bg-emerald-100',
            textColor: 'text-emerald-600'
        },
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
                    <p className="text-slate-600">
                        Manage and review all student complaints in one place
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm animate-slide-up"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`h-6 w-6 ${stat.textColor}`} />
                                    </div>
                                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                                </div>
                                <div className="text-3xl font-bold text-slate-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate-500">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6" id="complaints">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, ID, or keyword..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filter Groups */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Priority Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-slate-400" />
                                <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                                    {priorityFilters.map((filter) => (
                                        <button
                                            key={filter.id}
                                            onClick={() => setPriorityFilter(filter.id)}
                                            className={`px-3 py-1.5 text-sm font-medium transition-colors ${priorityFilter === filter.id
                                                    ? 'bg-teal-600 text-white'
                                                    : 'bg-white text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white pr-8"
                            >
                                {statusFilters.map(filter => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>

                            {/* Refresh Button */}
                            <button
                                onClick={() => {
                                    setPriorityFilter('ALL');
                                    setStatusFilter('ALL');
                                    setSearchQuery('');
                                }}
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Reset filters"
                            >
                                <RefreshCw className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(priorityFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
                            <span className="text-sm text-slate-500">Active filters:</span>
                            {priorityFilter !== 'ALL' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                    Priority: {priorityFilter}
                                    <button onClick={() => setPriorityFilter('ALL')} className="hover:text-slate-900">×</button>
                                </span>
                            )}
                            {statusFilter !== 'ALL' && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                    Status: {statusFilter}
                                    <button onClick={() => setStatusFilter('ALL')} className="hover:text-slate-900">×</button>
                                </span>
                            )}
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                                    Search: "{searchQuery}"
                                    <button onClick={() => setSearchQuery('')} className="hover:text-slate-900">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-600">
                        Showing <span className="font-semibold text-slate-900">{complaints.length}</span> complaints
                        {priorityFilter !== 'ALL' && ` with ${priorityFilter.toLowerCase()} priority`}
                    </p>
                    <p className="text-sm text-slate-500">
                        Sorted by priority (high to low)
                    </p>
                </div>

                {/* Complaints Table */}
                {isLoading ? (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                        <div className="spinner mx-auto mb-4" />
                        <p className="text-slate-500">Loading complaints...</p>
                    </div>
                ) : (
                    <ComplaintTable
                        complaints={complaints}
                        onComplaintClick={setSelectedComplaint}
                    />
                )}
            </main>

            {/* Detail Modal */}
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
