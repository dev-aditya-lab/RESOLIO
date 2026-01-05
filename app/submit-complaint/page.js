'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { COMPLAINT_CATEGORIES } from '@/lib/mockData';
import { submitComplaint } from '@/lib/mockServices';
import {
    User,
    Mail,
    Tag,
    FileText,
    Send,
    CheckCircle,
    AlertCircle,
    Sparkles,
    ArrowRight,
    Loader
} from 'lucide-react';

export default function SubmitComplaint() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        category: '',
        complaintText: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitState, setSubmitState] = useState('idle'); // idle, processing, success
    const [result, setResult] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.studentName.trim()) {
            newErrors.studentName = 'Name is required';
        }

        if (!formData.studentEmail.trim()) {
            newErrors.studentEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
            newErrors.studentEmail = 'Please enter a valid email address';
        }

        if (!formData.complaintText.trim()) {
            newErrors.complaintText = 'Complaint description is required';
        } else if (formData.complaintText.trim().length < 20) {
            newErrors.complaintText = 'Please provide more details (at least 20 characters)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitState('processing');

        try {
            const response = await submitComplaint(formData);
            setResult(response);
            setSubmitState('success');
        } catch (error) {
            console.error('Submission error:', error);
            setErrors({ submit: 'Failed to submit complaint. Please try again.' });
            setSubmitState('idle');
        }

        setIsSubmitting(false);
    };

    const handleNewComplaint = () => {
        setFormData({ studentName: '', studentEmail: '', category: '', complaintText: '' });
        setResult(null);
        setSubmitState('idle');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-2xl mb-6">
                        <FileText className="h-8 w-8 text-teal-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                        Submit a Complaint
                    </h1>
                    <p className="text-lg text-slate-600 max-w-xl mx-auto">
                        Share your concerns and our AI will analyze, categorize, and prioritize your complaint for quick resolution.
                    </p>
                </div>

                {/* Success State */}
                {submitState === 'success' && result && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-scale-in">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
                                <CheckCircle className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Complaint Submitted Successfully!
                            </h2>
                            <p className="text-emerald-100">
                                Your complaint has been analyzed by our AI
                            </p>
                        </div>

                        <div className="p-8 space-y-6">
                            {/* AI Analysis Result */}
                            <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="h-5 w-5 text-teal-600" />
                                    <h3 className="font-semibold text-teal-800">AI Analysis Result</h3>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Complaint ID</p>
                                        <p className="font-semibold text-teal-900">{result.complaint.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Category</p>
                                        <p className="font-semibold text-teal-900">{result.complaint.categoryLabel}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Priority Level</p>
                                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${result.complaint.priority === 'HIGH'
                                                ? 'bg-red-100 text-red-700'
                                                : result.complaint.priority === 'MEDIUM'
                                                    ? 'bg-amber-100 text-amber-700'
                                                    : 'bg-emerald-100 text-emerald-700'
                                            }`}>
                                            {result.complaint.priority}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-600 mb-1">Status</p>
                                        <p className="font-semibold text-teal-900">Pending Review</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-teal-200">
                                    <p className="text-xs text-teal-600 mb-1">AI Summary</p>
                                    <p className="text-sm text-teal-900">{result.complaint.aiSummary}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleNewComplaint}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-teal-700 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors"
                                >
                                    <FileText className="h-4 w-4" />
                                    Submit Another Complaint
                                </button>
                                <Link
                                    href="/admin"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors"
                                >
                                    View in Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Processing State */}
                {submitState === 'processing' && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center animate-fade-in">
                        <div className="spinner mx-auto mb-6" />
                        <h2 className="text-xl font-bold text-slate-900 mb-2">
                            Processing Your Complaint
                        </h2>
                        <p className="text-slate-600 mb-4">
                            Our AI is analyzing your submission...
                        </p>
                        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-teal-500 animate-pulse" />
                                Categorizing
                            </span>
                            <span className="flex items-center gap-2">
                                <Loader className="h-4 w-4 text-teal-500 animate-spin" />
                                Prioritizing
                            </span>
                            <span className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-teal-500 animate-pulse" />
                                Summarizing
                            </span>
                        </div>
                    </div>
                )}

                {/* Form */}
                {submitState === 'idle' && (
                    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
                        <div className="p-8 space-y-6">
                            {/* Global Error */}
                            {errors.submit && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                    <p className="text-sm">{errors.submit}</p>
                                </div>
                            )}

                            {/* Student Name */}
                            <div>
                                <label htmlFor="studentName" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    Student Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="studentName"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.studentName ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        }`}
                                />
                                {errors.studentName && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.studentName}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="studentEmail" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="studentEmail"
                                    name="studentEmail"
                                    value={formData.studentEmail}
                                    onChange={handleChange}
                                    placeholder="your.email@college.edu"
                                    className={`w-full px-4 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${errors.studentEmail ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        }`}
                                />
                                {errors.studentEmail && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="h-4 w-4" />
                                        {errors.studentEmail}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <Tag className="h-4 w-4 text-slate-400" />
                                    Category <span className="text-slate-400 font-normal">(Optional)</span>
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none bg-white"
                                >
                                    <option value="">Select a category (AI will auto-detect if left empty)</option>
                                    {COMPLAINT_CATEGORIES.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Complaint Text */}
                            <div>
                                <label htmlFor="complaintText" className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                    <FileText className="h-4 w-4 text-slate-400" />
                                    Complaint Details <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="complaintText"
                                    name="complaintText"
                                    value={formData.complaintText}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Describe your complaint in detail. Include relevant information such as dates, locations, and people involved..."
                                    className={`w-full px-4 py-3 border rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none ${errors.complaintText ? 'border-red-300 bg-red-50' : 'border-slate-200'
                                        }`}
                                />
                                <div className="flex items-center justify-between mt-2">
                                    {errors.complaintText ? (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4" />
                                            {errors.complaintText}
                                        </p>
                                    ) : (
                                        <span className="text-xs text-slate-400">
                                            Be specific to help us understand your concern better
                                        </span>
                                    )}
                                    <span className="text-xs text-slate-400">
                                        {formData.complaintText.length} characters
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-lg shadow-teal-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send className="h-5 w-5" />
                                Submit Complaint
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                Your complaint will be analyzed by our AI and prioritized accordingly
                            </p>
                        </div>
                    </form>
                )}

                {/* Info Card */}
                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 mb-1">What happens next?</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                After submission, our AI will analyze your complaint to determine the category and priority level.
                                High-priority issues are flagged for immediate attention. You can track your complaint status
                                through the admin dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
