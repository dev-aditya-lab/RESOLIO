'use client';

import ComplaintCard from './ComplaintCard';
import { FileX } from 'lucide-react';

export default function ComplaintTable({ complaints, onComplaintClick }) {
    if (!complaints || complaints.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <FileX className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">No complaints found</h3>
                <p className="text-sm text-slate-500">
                    Try adjusting your filters or check back later
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint, index) => (
                <div
                    key={complaint.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                >
                    <ComplaintCard
                        complaint={complaint}
                        onClick={() => onComplaintClick(complaint)}
                    />
                </div>
            ))}
        </div>
    );
}
