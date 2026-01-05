'use client';

import { STATUS_TYPES } from '@/lib/mockData';
import { Clock, Eye, Loader, CheckCircle } from 'lucide-react';

const iconMap = {
    Clock,
    Eye,
    Loader,
    CheckCircle,
};

export default function StatusBadge({ status, size = 'default', showIcon = true }) {
    const config = STATUS_TYPES[status] || STATUS_TYPES.PENDING;
    const IconComponent = showIcon ? iconMap[config.icon] : null;

    const sizeClasses = {
        small: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        large: 'px-3 py-1.5 text-sm',
    };

    const iconSizes = {
        small: 'h-3 w-3',
        default: 'h-3.5 w-3.5',
        large: 'h-4 w-4',
    };

    return (
        <span
            className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${config.bgColor} ${config.textColor}
        ${sizeClasses[size]}
      `}
        >
            {IconComponent && <IconComponent className={iconSizes[size]} />}
            {config.label}
        </span>
    );
}
