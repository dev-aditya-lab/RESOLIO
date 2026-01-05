'use client';

import { PRIORITY_LEVELS } from '@/lib/mockData';

export default function PriorityBadge({ priority, size = 'default' }) {
    const config = PRIORITY_LEVELS[priority] || PRIORITY_LEVELS.LOW;

    const sizeClasses = {
        small: 'px-2 py-0.5 text-xs',
        default: 'px-2.5 py-1 text-xs',
        large: 'px-3 py-1.5 text-sm',
    };

    return (
        <span
            className={`
        inline-flex items-center font-semibold rounded-full border
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${sizeClasses[size]}
      `}
        >
            {config.label}
        </span>
    );
}
