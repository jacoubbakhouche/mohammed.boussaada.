import React, { useState } from 'react';
import { Play, Menu, ChevronDown, CheckCircle2, Star, Quote, ArrowRight, Instagram, Youtube, Facebook, Twitter, Mail, Lock, Search, Bookmark, Share2, Sidebar, LogOut, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { DemoBackgroundPaths } from '../components/demo';

const YOUTUBE_VIDEO_ID = 'eaX04uyO9MM';
const INSTAGRAM_REELS = [
    'DVZWu9WiPFh',
    'DVPKnVJCByz',
    'DVBD7usiI2-',
];

const LESSONS = [
    { id: 1, title: 'Introduction', duration: '15:30', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-41710-large.mp4', description: 'The 5 basic principles of graphic design — symmetry, scale, framing, hierarchy, and grids.' },
    { id: 2, title: 'Symmetry vs. asymmetry', duration: '20:24', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-41696-large.mp4', description: 'You\'ll learn how both should employ balance and can be dynamic.' },
    { id: 3, title: 'Scale', duration: '18:10', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-man-working-on-his-laptop-34441-large.mp4', description: 'Scale is about size, but more than that, it\'s about relationships.' },
    { id: 4, title: 'Framing', duration: '22:45', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-41710-large.mp4', description: 'You\'ll learn how prevalent framing is in the design process.' },
    { id: 5, title: 'Hierarchy', duration: '19:55', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-person-typing-on-a-computer-keyboard-41696-large.mp4', description: 'Master the art of visual hierarchy to guide users\' attention.' },
    { id: 6, title: 'Grid Systems', duration: '25:00', videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-vertical-view-of-a-man-working-on-his-laptop-34441-large.mp4', description: 'Explore how grid systems create structure and consistency.' },
];

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#344E41] rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
                            <span className="text-lg font-bold text-white tracking-tight">Edit Master</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
                            <button className="flex items-center gap-1 hover:text-white transition-colors">Courses <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="flex items-center gap-1 hover:text-white transition-colors">Pricing <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="flex items-center gap-1 hover:text-white transition-colors">Blog <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="hover:text-white transition-colors">Free resources</button>
                            <button className="hover:text-white transition-colors">About us</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:block text-sm font-medium text-neutral-300 hover:text-white px-4 py-2 transition-colors">Log in</button>
                        <button
                            onClick={onGetStarted}
                            className="text-sm font-bold text-white bg-[#344E41] px-5 py-2.5 rounded-lg hover:bg-[#2a3f34] transition-colors"
                        >
                            Create account
                        </button>
                        <button className="md:hidden p-2 text-white"><Menu className="w-5 h-5" /></button>
                    </div>
                </div>
            </nav>

            {/* Hero Section with DemoBackgroundPaths */}
            <section className="relative overflow-hidden flex flex-col items-center justify-center w-full">
                <DemoBackgroundPaths />
            </section>

            {/* Reels Carousel Section */}
            <section className="max-w-full py-20 overflow-hidden bg-transparent">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-neutral-900 border border-neutral-800 text-[#d4dbc4] text-xs font-bold rounded-full tracking-wide mb-4 uppercase">
                        Premium Content
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                        Learn through immersive Reels
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
                        Master critical design and development workflows with bite-sized, high-impact vertical video lessons.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative group">
                    <style>{`
                        @keyframes scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(calc(-300px * 6 - 2rem * 6)); }
                        }
                        .animate-scroll {
                            animation: scroll 40s linear infinite;
                        }
                        .animate-scroll:hover {
                            animation-play-state: paused;
                        }
                        /* Hide scrollbar for Chrome, Safari and Opera */
                        .no-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                        /* Hide scrollbar for IE, Edge and Firefox */
                        .no-scrollbar {
                            -ms-overflow-style: none;  /* IE and Edge */
                            scrollbar-width: none;  /* Firefox */
                        }
                    `}</style>

                    <div className="flex gap-8 animate-scroll pl-6 w-max">
                        {/* Repeat lessons twice for seamless infinite scroll effect */}
                        {[...LESSONS, ...LESSONS].map((lesson, idx) => (
                            <div key={`${lesson.id}-${idx}`} className="w-[300px] flex-shrink-0 group/card">
                                <div className="relative bg-neutral-900 rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover/card:scale-[1.02] group-hover/card:shadow-neutral-800/50" style={{ aspectRatio: '9/16' }}>
                                    {/* Native Video Wrap */}
                                    <div className="absolute inset-0 bg-black">
                                        <video
                                            className="w-full h-full object-cover opacity-80"
                                            src={lesson.videoUrl}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                        />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                                        <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase mb-2">Lesson {lesson.id}</span>
                                        <h3 className="text-white font-bold text-xl mb-2">{lesson.title}</h3>
                                        <p className="text-white/70 text-sm mb-6 line-clamp-2 leading-relaxed">{lesson.description}</p>
                                        <button className="w-full py-4 bg-white text-[#344E41] rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#EEF0E5] transition-colors shadow-lg">
                                            <Play className="w-4 h-4 fill-current" />
                                            Watch Full Lesson
                                        </button>
                                    </div>

                                    {/* Subtle Badge */}
                                    <div className="absolute top-6 right-6 glass px-3 py-1.5 rounded-full border border-white/20 z-10 backdrop-blur-md opacity-80">
                                        <span className="text-[10px] font-bold text-white tracking-widest uppercase">{lesson.duration}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Gradient Fades for Carousel edges */}
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 via-neutral-950/50 to-transparent z-10 pointer-events-none" />
                </div>

                <div className="mt-20 text-center">
                    <button
                        onClick={onGetStarted}
                        className="group relative px-10 py-5 bg-[#344E41] text-white rounded-full font-bold text-lg hover:bg-[#2a3f34] transition-all hover:scale-105 shadow-2xl shadow-[#344E41]/30 overflow-hidden"
                    >
                        <span className="relative z-10">Start Your Journey Today</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="bg-neutral-900 rounded-[32px] p-12 md:p-20 text-center border border-neutral-800">
                    <p className="text-2xl md:text-4xl font-bold text-white leading-snug max-w-3xl mx-auto mb-10" style={{ fontFamily: "'Georgia', serif" }}>
                        "No other course has given me such a head start in design. I recommend it to everyone I know."
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        <img src="/profile.jpg" alt="Testimonial author" className="w-14 h-14 rounded-full object-cover border border-neutral-700" />
                        <div>
                            <p className="font-bold text-white">mohammed.boussaada.</p>
                            <p className="text-sm text-neutral-400">Illustrator, Sisyphus Ventures</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Custom Footer Tags */}
            <section className="max-w-7xl mx-auto px-6 py-12 text-center">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-neutral-500 opacity-60">
                    {['Serve Me App', 'Jacob Bakhouche', 'Annaba'].map(brand => (
                        <span key={brand} className="text-lg md:text-xl font-bold tracking-widest uppercase">{brand}</span>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900/50 mt-16 border-t border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#344E41] rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
                                <span className="text-lg font-bold">Edit Master</span>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                                Design courses taught by designers from the world's best companies
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-neutral-500">
                        © 2026 Edit Master. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
