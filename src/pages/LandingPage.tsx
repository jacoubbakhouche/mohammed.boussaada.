import React, { useState } from 'react';
import { Play, Menu, ChevronDown, CheckCircle2, Star, Quote, ArrowRight, Instagram, Youtube, Facebook, Twitter, Mail, Lock, Search, Bookmark, Share2, Sidebar, LogOut, MessageSquare, Clock, ChevronRight } from 'lucide-react';
import { GLSLHills } from '../components/ui/glsl-hills';

const YOUTUBE_VIDEO_ID = 'eaX04uyO9MM';

const INSTAGRAM_REELS = [
    'DVZWu9WiPFh',
    'DVPKnVJCByz',
    'DVBD7usiI2-',
];

const LESSONS = [
    { id: 1, title: 'Introduction', duration: '15:30', reelId: INSTAGRAM_REELS[0], description: 'The 5 basic principles of graphic design — symmetry, scale, framing, hierarchy, and grids.' },
    { id: 2, title: 'Symmetry vs. asymmetry', duration: '20:24', reelId: INSTAGRAM_REELS[1], description: 'You\'ll learn how both should employ balance and can be dynamic.' },
    { id: 3, title: 'Scale', duration: '18:10', reelId: INSTAGRAM_REELS[2], description: 'Scale is about size, but more than that, it\'s about relationships.' },
    { id: 4, title: 'Framing', duration: '22:45', reelId: INSTAGRAM_REELS[0], description: 'You\'ll learn how prevalent framing is in the design process.' },
    { id: 5, title: 'Hierarchy', duration: '19:55', reelId: INSTAGRAM_REELS[1], description: 'Master the art of visual hierarchy to guide users\' attention.' },
    { id: 6, title: 'Grid Systems', duration: '25:00', reelId: INSTAGRAM_REELS[2], description: 'Explore how grid systems create structure and consistency.' },
];

export const LandingPage: React.FC<{ onGetStarted: () => void }> = ({ onGetStarted }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-[#FAFAF7] text-[#1a2e1a] font-sans">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#FAFAF7]/90 backdrop-blur-md border-b border-[#e8e8e0]">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#344E41] rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
                            <span className="text-lg font-bold text-[#1a2e1a] tracking-tight">Edit Master</span>
                        </div>
                        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4a6a4a]">
                            <button className="flex items-center gap-1 hover:text-[#1a2e1a] transition-colors">Courses <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="flex items-center gap-1 hover:text-[#1a2e1a] transition-colors">Pricing <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="flex items-center gap-1 hover:text-[#1a2e1a] transition-colors">Blog <ChevronDown className="w-3.5 h-3.5" /></button>
                            <button className="hover:text-[#1a2e1a] transition-colors">Free resources</button>
                            <button className="hover:text-[#1a2e1a] transition-colors">About us</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="hidden sm:block text-sm font-medium text-[#4a6a4a] hover:text-[#1a2e1a] px-4 py-2 transition-colors">Log in</button>
                        <button
                            onClick={onGetStarted}
                            className="text-sm font-bold text-white bg-[#344E41] px-5 py-2.5 rounded-lg hover:bg-[#2a3f34] transition-colors"
                        >
                            Create account
                        </button>
                        <button className="md:hidden p-2"><Menu className="w-5 h-5" /></button>
                    </div>
                </div>
            </nav>

            {/* Hero Section with YouTube Video */}
            <section className="relative pt-16 pb-6 overflow-hidden min-h-[800px] flex flex-col items-center justify-center">
                {/* GLSL Hills Background */}
                <div className="absolute inset-0 z-0">
                    <GLSLHills speed={0.3} cameraZ={150} />
                </div>

                <div className="relative z-10 w-full bg-[#EEF0E5]/80 backdrop-blur-sm p-10 md:p-16 text-center border-y border-[#d4dbc4]">
                    <div className="max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 bg-[#d4dbc4] text-[#344E41] text-xs font-bold rounded-full tracking-wide mb-6">
                            Updated March 2026
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold text-[#1a2e1a] leading-tight mb-6" style={{ fontFamily: "'Georgia', serif" }}>
                            Designs That Speak <br />
                            <span className="italic font-light">Louder Than Words</span>
                        </h1>
                        <p className="text-[#4a6a4a] text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                            We craft stunning visuals and user-friendly experiences that help your brand stand out and connect with your audience.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden aspect-video shadow-xl">
                        {isPlaying ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                                title="Course Introduction"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full absolute inset-0"
                            />
                        ) : (
                            <div className="cursor-pointer group relative w-full h-full" onClick={() => setIsPlaying(true)}>
                                <img
                                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                                    alt="Course Introduction"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                        <Play className="w-8 h-8 text-[#344E41] fill-current ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 text-left text-white">
                                    <p className="text-sm font-bold">Introduction Video</p>
                                    <p className="text-xs opacity-80">Click to play</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Reels Carousel Section */}
            <section className="max-w-full py-20 overflow-hidden bg-[#FAFAF7]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-[#d4dbc4] text-[#344E41] text-xs font-bold rounded-full tracking-wide mb-4 uppercase">
                        Premium Content
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[#1a2e1a] mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                        Learn through immersive Reels
                    </h2>
                    <p className="text-[#4a6a4a] text-lg max-w-2xl leading-relaxed">
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
                                <div className="relative bg-[#e0e2d5] rounded-[40px] overflow-hidden shadow-2xl transition-all duration-500 group-hover/card:scale-[1.02] group-hover/card:shadow-sage-900/10" style={{ aspectRatio: '9/16' }}>
                                    {/* Instagram Reel - Video Only (cropped UI) */}
                                    <div className="absolute inset-0" style={{ top: '-60px', bottom: '-80px', left: '-1px', right: '-1px' }}>
                                        <iframe
                                            src={`https://www.instagram.com/reel/${lesson.reelId}/embed/?hidecaption=true&cr=1`}
                                            className="w-full h-[120%] border-0 pointer-events-none"
                                            allowFullScreen
                                            scrolling="no"
                                            title={`Lesson ${lesson.id}: ${lesson.title}`}
                                        />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/90 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
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
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFAF7] via-[#FAFAF7]/50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFAF7] via-[#FAFAF7]/50 to-transparent z-10 pointer-events-none" />
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
                <div className="bg-[#EEF0E5] rounded-[32px] p-12 md:p-20 text-center">
                    <p className="text-2xl md:text-4xl font-bold text-[#1a2e1a] leading-snug max-w-3xl mx-auto mb-10" style={{ fontFamily: "'Georgia', serif" }}>
                        "No other course has given me such a head start in design. I recommend it to everyone I know."
                    </p>
                    <div className="flex flex-col items-center gap-3">
                        <img src="/instructor.png" alt="Testimonial author" className="w-14 h-14 rounded-full object-cover" />
                        <div>
                            <p className="font-bold text-[#1a2e1a]">mohammed.boussaada.</p>
                            <p className="text-sm text-[#4a6a4a]">Illustrator, Sisyphus Ventures</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Logos */}
            <section className="max-w-7xl mx-auto px-6 py-12 text-center">
                <p className="text-xs font-medium tracking-widest text-[#8a9a8a] mb-8 uppercase">Designers from the world's best companies</p>
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[#8a9a8a] opacity-60">
                    {['Square', 'Splunk', 'Ghost', 'Sonos', 'Squarespace', 'Uber', 'Twitch', 'Stripe'].map(brand => (
                        <span key={brand} className="text-lg md:text-xl font-bold tracking-tight">{brand}</span>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#EEF0E5] mt-16">
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                        <div className="col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#344E41] rounded-lg flex items-center justify-center text-white font-bold text-sm">E</div>
                                <span className="text-lg font-bold">Edit Master</span>
                            </div>
                            <p className="text-sm text-[#4a6a4a] leading-relaxed max-w-xs">
                                Design courses taught by designers from the world's best companies
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-[#d4dbc4] mt-12 pt-8 text-sm text-[#8a9a8a]">
                        © 2026 Edit Master. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};
