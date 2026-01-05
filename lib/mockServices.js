// Mock Services for Resolvo - AI-Based College Complaint Management System
// These services simulate AI processing and can be easily replaced with real API calls

import { mockComplaints, COMPLAINT_CATEGORIES } from './mockData';

// Keywords for priority detection
const HIGH_PRIORITY_KEYWORDS = [
    'urgent', 'critical', 'emergency', 'immediate', 'safety', 'health',
    'severe', 'broken', 'non-functional', 'hazard', 'dangerous', 'multiple students',
    'weeks', 'months', 'no water', 'no electricity', 'pest', 'infestation'
];

const MEDIUM_PRIORITY_KEYWORDS = [
    'inconvenience', 'slow', 'delayed', 'outdated', 'frequently', 'often',
    'quality', 'uncomfortable', 'incorrect', 'error', 'crash', 'late'
];

/**
 * Simulate AI analysis of complaint text
 * Returns priority and generates a summary
 */
export function analyzeComplaint(text, category = 'other') {
    const lowerText = text.toLowerCase();

    // Determine priority based on keywords
    let priority = 'LOW';

    for (const keyword of HIGH_PRIORITY_KEYWORDS) {
        if (lowerText.includes(keyword)) {
            priority = 'HIGH';
            break;
        }
    }

    if (priority !== 'HIGH') {
        for (const keyword of MEDIUM_PRIORITY_KEYWORDS) {
            if (lowerText.includes(keyword)) {
                priority = 'MEDIUM';
                break;
            }
        }
    }

    // Generate summary (first 120 chars + context)
    const summary = generateSummary(text, category, priority);

    // Get category label
    const categoryInfo = COMPLAINT_CATEGORIES.find(c => c.id === category);
    const categoryLabel = categoryInfo ? categoryInfo.label : 'Other';

    return {
        priority,
        category,
        categoryLabel,
        aiSummary: summary,
    };
}

/**
 * Generate AI-like summary from complaint text
 */
function generateSummary(text, category, priority) {
    // Simple summary generation - take first meaningful part
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (sentences.length === 0) return 'Complaint submitted for review.';

    // Take first sentence and truncate if too long
    let summary = sentences[0].trim();
    if (summary.length > 100) {
        summary = summary.substring(0, 100) + '...';
    }

    // Add priority context
    if (priority === 'HIGH') {
        summary += ' Requires immediate attention.';
    } else if (priority === 'MEDIUM') {
        summary += ' Needs review.';
    }

    return summary;
}

/**
 * Submit a new complaint (simulates API call with delay)
 */
export async function submitComplaint(formData) {
    // Simulate network delay and AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Analyze the complaint
    const analysis = analyzeComplaint(formData.complaintText, formData.category);

    // Generate new complaint ID
    const newId = `CMP${String(mockComplaints.length + 1).padStart(3, '0')}`;

    // Create new complaint object
    const newComplaint = {
        id: newId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        category: formData.category || 'other',
        categoryLabel: analysis.categoryLabel,
        complaintText: formData.complaintText,
        priority: analysis.priority,
        status: 'PENDING',
        aiSummary: analysis.aiSummary,
        submittedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    // Add to mock data (in real app, this would be an API call)
    mockComplaints.unshift(newComplaint);

    return {
        success: true,
        complaint: newComplaint,
        message: 'Complaint submitted successfully! Our AI has analyzed and categorized your complaint.',
    };
}

/**
 * Update complaint status (simulates API call)
 */
export async function updateComplaintStatus(complaintId, newStatus) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // Find and update the complaint
    const complaint = mockComplaints.find(c => c.id === complaintId);

    if (!complaint) {
        return {
            success: false,
            message: 'Complaint not found',
        };
    }

    complaint.status = newStatus;
    complaint.updatedAt = new Date().toISOString();

    return {
        success: true,
        complaint,
        message: `Status updated to ${newStatus}`,
    };
}

/**
 * Get all complaints with optional filtering
 */
export function getFilteredComplaints({ priority = 'ALL', status = 'ALL', sortByPriority = true }) {
    let filtered = [...mockComplaints];

    // Filter by priority
    if (priority !== 'ALL') {
        filtered = filtered.filter(c => c.priority === priority);
    }

    // Filter by status
    if (status !== 'ALL') {
        filtered = filtered.filter(c => c.status === status);
    }

    // Sort by priority if requested
    if (sortByPriority) {
        const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
        filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return filtered;
}

/**
 * Simulate real-time updates (for demo purposes)
 */
export function subscribeToUpdates(callback) {
    // In a real app, this would be a WebSocket or Server-Sent Events connection
    // For demo, we just return the current data
    callback(mockComplaints);

    return () => {
        // Cleanup function
    };
}
