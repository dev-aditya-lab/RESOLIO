import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import {
    ArrowRight,
    Sparkles,
    Gauge,
    Shield,
    CheckCircle,
    BarChart3,
    Clock,
    Users,
    Building,
    Star
} from 'lucide-react';

const features = [
    {
        icon: Sparkles,
        title: 'AI-Powered Analysis',
        description: 'Our advanced AI automatically categorizes and summarizes complaints, extracting key issues and sentiments.',
        color: 'slate',
    },
    {
        icon: Gauge,
        title: 'Smart Priority Detection',
        description: 'Intelligent algorithms identify urgent issues and prioritize high-impact complaints automatically.',
        color: 'slate',
    },
    {
        icon: Shield,
        title: 'Secure & Confidential',
        description: 'Enterprise-grade security ensures all student data and complaints remain private and protected.',
        color: 'slate',
    },
];

const stats = [
    { value: '500+', label: 'Institutions', icon: Building },
    { value: '1M+', label: 'Complaints Resolved', icon: CheckCircle },
    { value: '98%', label: 'Satisfaction Rate', icon: Star },
    { value: '<2hrs', label: 'Avg Response Time', icon: Clock },
];

const testimonials = [
    {
        quote: "Resolvo transformed how we handle student grievances. The AI categorization saves us hours every day.",
        author: "Dr. Priya Sharma",
        role: "Dean of Students, IIT Delhi",
    },
    {
        quote: "The priority detection is incredibly accurate. We now address critical issues before they escalate.",
        author: "Prof. Rajesh Kumar",
        role: "Vice Chancellor, Mumbai University",
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 gradient-hero" />
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-slate-200 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-300 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-200 mb-8 animate-fade-in">
                            <Sparkles className="h-4 w-4 text-slate-600" />
                            <span className="text-sm font-medium text-slate-700">
                                Powered by Advanced AI Technology
                            </span>
                        </div>

                        {/* Logo & Title */}
                        <div className="flex items-center justify-center gap-4 mb-6 animate-slide-up">
                            <div className="relative w-16 h-16 lg:w-20 lg:h-20">
                                <Image
                                    src="/logo.png"
                                    alt="Resolvo"
                                    fill
                                    className="object-contain rounded-2xl shadow-lg"
                                    priority
                                />
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                                Resolvo
                            </h1>
                        </div>

                        {/* Headline */}
                        <h2 className="text-2xl lg:text-4xl font-bold text-slate-800 mb-6 animate-slide-up">
                            AI-Powered College{' '}
                            <span className="text-gradient">Grievance Management</span>
                        </h2>

                        {/* Subtitle */}
                        <p className="text-lg lg:text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-slide-up">
                            Helping institutions identify and prioritize critical student complaints using artificial intelligence.
                            Transform how your college handles grievances.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
                            <Link
                                href="/submit-complaint"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Submit a Complaint
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/admin"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-xl transition-all shadow-md border border-slate-200 hover:-translate-y-0.5"
                            >
                                Admin Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="text-center animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mb-4">
                                        <Icon className="h-6 w-6 text-slate-600" />
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                        {stat.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            Why Choose Resolvo?
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Streamline your grievance management with cutting-edge AI technology designed for educational institutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const colorClasses = {
                                indigo: 'bg-slate-100 text-slate-600',
                                violet: 'bg-slate-100 text-slate-600',
                                slate: 'bg-slate-100 text-slate-600',
                            };

                            return (
                                <div
                                    key={feature.title}
                                    className="bg-white rounded-2xl p-8 border border-slate-200 card-hover animate-slide-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${colorClasses[feature.color]}`}>
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Simple, efficient, and intelligent complaint management in three easy steps.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200" />

                        {[
                            { step: '01', title: 'Submit Complaint', desc: 'Students submit their grievances through our simple, user-friendly form.' },
                            { step: '02', title: 'AI Analysis', desc: 'Our AI instantly categorizes, prioritizes, and summarizes each complaint.' },
                            { step: '03', title: 'Quick Resolution', desc: 'Administrators review and resolve issues efficiently with full context.' },
                        ].map((item, index) => (
                            <div
                                key={item.step}
                                className="relative text-center animate-slide-up"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 rounded-full text-white text-2xl font-bold mb-6 shadow-lg relative z-10">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Trusted by Leading Institutions
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            See what administrators across India are saying about Resolvo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.author}
                                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-lg text-slate-300 mb-6 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-slate-900 rounded-3xl p-12 shadow-2xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                            Ready to Transform Your Institution?
                        </h2>
                        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                            Join hundreds of colleges using Resolvo to improve student satisfaction and streamline complaint resolution.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/submit-complaint"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
                            >
                                Get Started Free
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                            <Link
                                href="/pricing"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:bg-white/10 rounded-xl transition-all"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.png"
                                    alt="Resolvo"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <span className="text-xl font-bold">Resolvo</span>
                        </div>
                        <nav className="flex flex-wrap items-center justify-center gap-6">
                            <Link href="/" className="text-slate-400 hover:text-white transition-colors">Home</Link>
                            <Link href="/submit-complaint" className="text-slate-400 hover:text-white transition-colors">Submit Complaint</Link>
                            <Link href="/admin" className="text-slate-400 hover:text-white transition-colors">Admin</Link>
                            <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
                        </nav>
                        <p className="text-slate-400 text-sm">
                            © 2026 Resolvo. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
