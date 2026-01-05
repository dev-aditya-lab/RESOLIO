// Mock Data for Resolvo - AI-Based College Complaint Management System

// Complaint Categories
export const COMPLAINT_CATEGORIES = [
    { id: 'academic', label: 'Academic Issues', icon: 'BookOpen' },
    { id: 'infrastructure', label: 'Infrastructure & Facilities', icon: 'Building' },
    { id: 'faculty', label: 'Faculty Related', icon: 'Users' },
    { id: 'administrative', label: 'Administrative', icon: 'FileText' },
    { id: 'hostel', label: 'Hostel & Accommodation', icon: 'Home' },
    { id: 'library', label: 'Library Services', icon: 'Library' },
    { id: 'transport', label: 'Transport', icon: 'Bus' },
    { id: 'financial', label: 'Financial & Fees', icon: 'CreditCard' },
    { id: 'other', label: 'Other', icon: 'MoreHorizontal' },
];

// Priority Levels
export const PRIORITY_LEVELS = {
    HIGH: { label: 'High', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-200' },
    MEDIUM: { label: 'Medium', color: 'yellow', bgColor: 'bg-amber-100', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
    LOW: { label: 'Low', color: 'green', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
};

// Status Types
export const STATUS_TYPES = {
    PENDING: { label: 'Pending', bgColor: 'bg-slate-100', textColor: 'text-slate-600', icon: 'Clock' },
    REVIEWED: { label: 'Reviewed', bgColor: 'bg-blue-100', textColor: 'text-blue-700', icon: 'Eye' },
    IN_PROGRESS: { label: 'In Progress', bgColor: 'bg-purple-100', textColor: 'text-purple-700', icon: 'Loader' },
    RESOLVED: { label: 'Resolved', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', icon: 'CheckCircle' },
};

// Mock Complaints Data
export const mockComplaints = [
    {
        id: 'CMP001',
        studentName: 'Rahul Sharma',
        studentEmail: 'rahul.sharma@college.edu',
        category: 'infrastructure',
        categoryLabel: 'Infrastructure & Facilities',
        complaintText: 'The air conditioning system in Block B has been completely non-functional for the past two weeks. Multiple students are affected and the heat is making it impossible to concentrate during lectures. This is an urgent issue that needs immediate attention as it affects over 200 students daily.',
        priority: 'HIGH',
        status: 'PENDING',
        aiSummary: 'Critical AC failure in Block B affecting 200+ students. Urgent infrastructure repair needed.',
        submittedAt: '2026-01-05T08:30:00Z',
        updatedAt: '2026-01-05T08:30:00Z',
    },
    {
        id: 'CMP002',
        studentName: 'Priya Patel',
        studentEmail: 'priya.patel@college.edu',
        category: 'academic',
        categoryLabel: 'Academic Issues',
        complaintText: 'The course materials for Advanced Database Systems have not been updated since 2023. We are learning outdated concepts while the industry has moved ahead. Request to update the curriculum with modern technologies like cloud databases and NoSQL systems.',
        priority: 'MEDIUM',
        status: 'REVIEWED',
        aiSummary: 'Outdated curriculum in Database Systems course. Suggests adding cloud and NoSQL content.',
        submittedAt: '2026-01-04T14:20:00Z',
        updatedAt: '2026-01-05T09:15:00Z',
    },
    {
        id: 'CMP003',
        studentName: 'Arjun Kumar',
        studentEmail: 'arjun.k@college.edu',
        category: 'hostel',
        categoryLabel: 'Hostel & Accommodation',
        complaintText: 'Water supply to Hostel Block 5 has been erratic for the past week. Sometimes there is no water in the morning, making it difficult for students to get ready for early morning classes. This is a health and hygiene concern.',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        aiSummary: 'Erratic water supply in Hostel Block 5. Health/hygiene risk requiring urgent resolution.',
        submittedAt: '2026-01-03T07:45:00Z',
        updatedAt: '2026-01-04T11:30:00Z',
    },
    {
        id: 'CMP004',
        studentName: 'Sneha Reddy',
        studentEmail: 'sneha.r@college.edu',
        category: 'library',
        categoryLabel: 'Library Services',
        complaintText: 'The digital library portal frequently crashes during peak hours, especially before exams. Many students rely on e-books and research papers available only through the portal. Please upgrade the server capacity.',
        priority: 'MEDIUM',
        status: 'PENDING',
        aiSummary: 'Digital library portal crashes during peak hours. Server upgrade recommended.',
        submittedAt: '2026-01-03T16:00:00Z',
        updatedAt: '2026-01-03T16:00:00Z',
    },
    {
        id: 'CMP005',
        studentName: 'Vikram Singh',
        studentEmail: 'vikram.s@college.edu',
        category: 'faculty',
        categoryLabel: 'Faculty Related',
        complaintText: 'Professor in Machine Learning course frequently cancels classes without prior notice. We have missed 5 lectures this semester alone. This is affecting our exam preparation and understanding of the subject.',
        priority: 'HIGH',
        status: 'PENDING',
        aiSummary: 'Frequent unannounced class cancellations in ML course. 5 missed lectures impacting exam prep.',
        submittedAt: '2026-01-02T11:20:00Z',
        updatedAt: '2026-01-02T11:20:00Z',
    },
    {
        id: 'CMP006',
        studentName: 'Ananya Gupta',
        studentEmail: 'ananya.g@college.edu',
        category: 'transport',
        categoryLabel: 'Transport',
        complaintText: 'The college bus on Route 7 is consistently late by 20-30 minutes. Students are missing their first period classes. Request to either change the schedule or add an earlier bus.',
        priority: 'MEDIUM',
        status: 'RESOLVED',
        aiSummary: 'Route 7 bus consistently late causing missed classes. Schedule adjustment needed.',
        submittedAt: '2025-12-28T08:00:00Z',
        updatedAt: '2026-01-02T14:00:00Z',
    },
    {
        id: 'CMP007',
        studentName: 'Mohammed Ali',
        studentEmail: 'm.ali@college.edu',
        category: 'financial',
        categoryLabel: 'Financial & Fees',
        complaintText: 'I submitted my scholarship renewal documents two months ago but haven\'t received any update. The fee deadline is approaching and I need the scholarship to be processed before I can pay the remaining amount.',
        priority: 'HIGH',
        status: 'REVIEWED',
        aiSummary: 'Pending scholarship renewal for 2 months. Urgent due to upcoming fee deadline.',
        submittedAt: '2026-01-01T10:30:00Z',
        updatedAt: '2026-01-03T09:00:00Z',
    },
    {
        id: 'CMP008',
        studentName: 'Kavitha Nair',
        studentEmail: 'kavitha.n@college.edu',
        category: 'administrative',
        categoryLabel: 'Administrative',
        complaintText: 'The online portal for downloading grade reports and transcripts has been showing incorrect information. My CGPA displayed is different from my actual calculated CGPA. Please verify and correct.',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        aiSummary: 'Grade report portal showing incorrect CGPA. Data verification and correction needed.',
        submittedAt: '2025-12-30T13:15:00Z',
        updatedAt: '2026-01-04T10:00:00Z',
    },
    {
        id: 'CMP009',
        studentName: 'Ravi Teja',
        studentEmail: 'ravi.t@college.edu',
        category: 'infrastructure',
        categoryLabel: 'Infrastructure & Facilities',
        complaintText: 'The projector in Seminar Hall A produces a very dim display making it hard to read during presentations. This has been an issue for several months. A replacement or repair would greatly improve the learning experience.',
        priority: 'LOW',
        status: 'PENDING',
        aiSummary: 'Dim projector in Seminar Hall A affecting presentations. Repair/replacement suggested.',
        submittedAt: '2025-12-29T15:45:00Z',
        updatedAt: '2025-12-29T15:45:00Z',
    },
    {
        id: 'CMP010',
        studentName: 'Deepika Menon',
        studentEmail: 'deepika.m@college.edu',
        category: 'academic',
        categoryLabel: 'Academic Issues',
        complaintText: 'There is a scheduling conflict between Elective A and Core Subject B. Both are at the same time slot on Tuesdays and Thursdays. Please consider rescheduling one of them.',
        priority: 'LOW',
        status: 'RESOLVED',
        aiSummary: 'Class scheduling conflict on Tue/Thu. Rescheduling one course recommended.',
        submittedAt: '2025-12-27T09:30:00Z',
        updatedAt: '2025-12-30T11:00:00Z',
    },
    {
        id: 'CMP011',
        studentName: 'Sanjay Verma',
        studentEmail: 'sanjay.v@college.edu',
        category: 'hostel',
        categoryLabel: 'Hostel & Accommodation',
        complaintText: 'Room 204 in Block C has a severe pest problem. Despite multiple complaints to the warden, no action has been taken. This is affecting my health and studies.',
        priority: 'HIGH',
        status: 'PENDING',
        aiSummary: 'Severe pest infestation in Hostel Block C Room 204. Health hazard requiring immediate action.',
        submittedAt: '2026-01-04T19:00:00Z',
        updatedAt: '2026-01-04T19:00:00Z',
    },
    {
        id: 'CMP012',
        studentName: 'Meera Joshi',
        studentEmail: 'meera.j@college.edu',
        category: 'other',
        categoryLabel: 'Other',
        complaintText: 'The cafeteria food quality has declined significantly. The food is often cold and there are limited healthy options. Many students are opting to skip meals which is not ideal for their health.',
        priority: 'LOW',
        status: 'REVIEWED',
        aiSummary: 'Declining cafeteria food quality. Cold food and lack of healthy options reported.',
        submittedAt: '2025-12-26T12:30:00Z',
        updatedAt: '2026-01-02T16:00:00Z',
    },
];

// Helper Functions

/**
 * Get complaints filtered by priority
 */
export function getComplaintsByPriority(priority) {
    if (!priority || priority === 'ALL') return mockComplaints;
    return mockComplaints.filter(c => c.priority === priority);
}

/**
 * Get complaints filtered by status
 */
export function getComplaintsByStatus(status) {
    if (!status || status === 'ALL') return mockComplaints;
    return mockComplaints.filter(c => c.status === status);
}

/**
 * Get complaint by ID
 */
export function getComplaintById(id) {
    return mockComplaints.find(c => c.id === id);
}

/**
 * Sort complaints by priority (HIGH first, then MEDIUM, then LOW)
 */
export function sortByPriority(complaints) {
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    return [...complaints].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

/**
 * Get statistics
 */
export function getStatistics() {
    const total = mockComplaints.length;
    const highPriority = mockComplaints.filter(c => c.priority === 'HIGH').length;
    const pending = mockComplaints.filter(c => c.status === 'PENDING').length;
    const reviewed = mockComplaints.filter(c => c.status === 'REVIEWED' || c.status === 'RESOLVED').length;
    const inProgress = mockComplaints.filter(c => c.status === 'IN_PROGRESS').length;
    const resolved = mockComplaints.filter(c => c.status === 'RESOLVED').length;

    return { total, highPriority, pending, reviewed, inProgress, resolved };
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
