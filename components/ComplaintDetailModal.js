'use client';

import { useState } from 'react';
import { formatDate, STATUS_TYPES } from '@/lib/mockData';
import { updateComplaintStatus } from '@/lib/mockServices';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import {
    X,
    User,
    Mail,
    Tag,
    Calendar,
    Sparkles,
    CheckCircle,
    RotateCcw,
    FileText,
    Loader
} from 'lucide-react';

export default function ComplaintDetailModal({ complaint, onClose, onStatusUpdate }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(complaint.status);

    const handleStatusToggle = async () => {
        setIsUpdating(true);

        // Toggle between PENDING and REVIEWED
        const newStatus = currentStatus === 'PENDING' ? 'REVIEWED' :
            currentStatus === 'REVIEWED' ? 'RESOLVED' :
                currentStatus === 'RESOLVED' ? 'PENDING' : 'REVIEWED';

        try {
            const result = await updateComplaintStatus(complaint.id, newStatus);
            if (result.success) {
                setCurrentStatus(newStatus);
                if (onStatusUpdate) {
                    onStatusUpdate(complaint.id, newStatus);
                }
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }

        setIsUpdating(false);
    };

    const getStatusButtonText = () => {
        if (isUpdating) return 'Updating...';
        switch (currentStatus) {
            case 'PENDING': return 'Mark as Reviewed';
            case 'REVIEWED': return 'Mark as Resolved';
            case 'RESOLVED': return 'Reopen Complaint';
            case 'IN_PROGRESS': return 'Mark as Reviewed';
            default: return 'Update Status';
        }
    };

    const getStatusButtonIcon = () => {
        if (isUpdating) return Loader;
        switch (currentStatus) {
            case 'RESOLVED': return RotateCcw;
            default: return CheckCircle;
        }
    };

    const StatusIcon = getStatusButtonIcon();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white font-bold">
                                {complaint.studentName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Complaint {complaint.id}
                                </h2>
                                <p className="text-sm text-slate-500">
                                    Submitted by {complaint.studentName}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <User className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Student Name</p>
                                    <p className="text-sm font-medium text-slate-900">{complaint.studentName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <Mail className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Email</p>
                                    <p className="text-sm font-medium text-slate-900">{complaint.studentEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <Tag className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Category</p>
                                    <p className="text-sm font-medium text-slate-900">{complaint.categoryLabel}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                                <Calendar className="h-5 w-5 text-slate-400" />
                                <div>
                                    <p className="text-xs text-slate-500">Submitted</p>
                                    <p className="text-sm font-medium text-slate-900">{formatDate(complaint.submittedAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Priority</p>
                                <PriorityBadge priority={complaint.priority} size="large" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                <StatusBadge status={currentStatus} size="large" />
                            </div>
                        </div>

                        {/* AI Summary */}
                        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-5 border border-teal-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-teal-600" />
                                <h3 className="font-semibold text-teal-800">AI Analysis Summary</h3>
                            </div>
                            <p className="text-sm text-teal-900">
                                {complaint.aiSummary}
                            </p>
                        </div>

                        {/* Full Complaint */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <FileText className="h-5 w-5 text-slate-400" />
                                <h3 className="font-semibold text-slate-900">Full Complaint</h3>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                                <p className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                    {complaint.complaintText}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                        <p className="text-sm text-slate-500">
                            Last updated: {formatDate(complaint.updatedAt)}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleStatusToggle}
                                disabled={isUpdating}
                                className={`
                  inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors
                  ${currentStatus === 'RESOLVED'
                                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                        : 'bg-teal-600 hover:bg-teal-700 text-white'
                                    }
                  ${isUpdating ? 'opacity-75 cursor-not-allowed' : ''}
                `}
                            >
                                <StatusIcon className={`h-4 w-4 ${isUpdating ? 'animate-spin' : ''}`} />
                                {getStatusButtonText()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
