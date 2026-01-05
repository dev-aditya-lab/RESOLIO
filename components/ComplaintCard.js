'use client';

import { formatDate } from '@/lib/mockData';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import { Mail, Tag, Sparkles, ChevronRight } from 'lucide-react';

export default function ComplaintCard({ complaint, onClick }) {
    const truncatedText = complaint.complaintText.length > 120
        ? complaint.complaintText.substring(0, 120) + '...'
        : complaint.complaintText;

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-xl border border-slate-200 p-5 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm">
                        {complaint.studentName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            {complaint.studentName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {complaint.studentEmail}
                        </p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-teal-600 transition-colors" />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
                <PriorityBadge priority={complaint.priority} size="small" />
                <StatusBadge status={complaint.status} size="small" />
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    <Tag className="h-3 w-3" />
                    {complaint.categoryLabel}
                </span>
            </div>

            {/* Text */}
            <p className="text-sm text-slate-600 mb-3">
                {truncatedText}
            </p>

            {/* AI Summary */}
            <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                    <span className="text-xs font-semibold text-teal-700">AI Summary</span>
                </div>
                <p className="text-xs text-teal-800">
                    {complaint.aiSummary}
                </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">{complaint.id}</span>
                <span className="text-xs text-slate-400">{formatDate(complaint.submittedAt)}</span>
            </div>
        </div>
    );
}
