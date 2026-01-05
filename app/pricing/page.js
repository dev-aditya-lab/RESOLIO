import Link from 'next/link';
import Image from 'next/image';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

const plans = [
    {
        name: 'Starter',
        price: '$99',
        period: '/month',
        description: 'For small colleges getting started',
        features: [
            'Up to 500 complaints/month',
            'AI categorization',
            'Basic priority detection',
            'Email notifications',
            '5 admin users',
            'Email support'
        ],
        cta: 'Start Free Trial',
        popular: false
    },
    {
        name: 'Professional',
        price: '$299',
        period: '/month',
        description: 'For growing institutions',
        features: [
            'Up to 5,000 complaints/month',
            'Advanced AI analysis',
            'Priority & sentiment detection',
            'Email & SMS notifications',
            '25 admin users',
            'Priority support',
            'Custom categories',
            'API access'
        ],
        cta: 'Start Free Trial',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For large universities',
        features: [
            'Unlimited complaints',
            'Custom AI models',
            'Multi-campus support',
            'Advanced analytics',
            'Unlimited admin users',
            'Dedicated support',
            'SLA guarantee',
            'Custom integrations'
        ],
        cta: 'Contact Sales',
        popular: false
    }
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-14">
                <div className="text-center mb-14">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Choose the plan that fits your institution.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-white rounded-2xl p-7 border-2 transition-shadow hover:shadow-lg ${plan.popular ? 'border-slate-900 shadow-lg relative' : 'border-gray-200'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-slate-900 text-white text-xs font-semibold px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-500 ml-1 text-sm">{plan.period}</span>
                                </div>
                            </div>
                            <ul className="space-y-3 mb-7">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <Check className="h-4 w-4 text-slate-600 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${plan.popular
                                        ? 'bg-slate-900 hover:bg-slate-800 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">All Plans Include</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="h-6 w-6 text-slate-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">AI-Powered Analysis</h3>
                            <p className="text-gray-600 text-sm">Automatic categorization and priority detection</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Zap className="h-6 w-6 text-slate-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Real-Time Processing</h3>
                            <p className="text-gray-600 text-sm">Instant analysis and routing of complaints</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-6 w-6 text-slate-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">Secure & Compliant</h3>
                            <p className="text-gray-600 text-sm">Enterprise-grade security with FERPA compliance</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/submit-complaint"
                        className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        <span>Contact Sales</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
