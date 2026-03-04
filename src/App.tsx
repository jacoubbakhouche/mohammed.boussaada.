import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Users, BarChart2, Settings, LogOut, Bell, Search, User as UserIcon, Loader2 } from 'lucide-react';
import { CoursePlayer } from './components/CoursePlayer';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { supabase } from './lib/supabase';
import type { User } from '@supabase/supabase-js';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}
    >
        <Icon className="w-5 h-5" />
        <span className="font-medium whitespace-nowrap">{label}</span>
    </button>
);

function App() {
    const [view, setView] = useState<'landing' | 'auth' | 'dashboard'>('landing');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount (handles OAuth redirect)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                setView('dashboard');
            }
            setLoading(false);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            if (session?.user) {
                setView('dashboard');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setView('landing');
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
        );
    }

    if (view === 'landing') {
        return <LandingPage onGetStarted={() => setView('auth')} />;
    }

    if (view === 'auth' && !user) {
        return <AuthPage />;
    }

    const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Alex Rivera';
    const avatarUrl = user?.user_metadata?.avatar_url;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Glassmorphic Sidebar */}
            <aside className="hidden md:flex w-72 flex-col p-6 m-4 mr-0 rounded-[32px] bg-[#EEF0E5] border border-[#d4dbc4] shadow-xl">
                <div
                    onClick={() => setView('landing')}
                    className="flex items-center gap-3 mb-10 px-2 cursor-pointer group"
                >
                    <div className="w-10 h-10 bg-[#344E41] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">E</div>
                    <span className="text-xl font-bold text-[#1a2e1a]">Edit Master</span>
                </div>

                <nav className="flex-grow space-y-2">
                    <SidebarItem icon={Home} label="Dashboard" />
                    <SidebarItem icon={BookOpen} label="My Courses" active />
                    <SidebarItem icon={Users} label="Community" />
                    <SidebarItem icon={BarChart2} label="Analytics" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-auto pt-6 border-t border-[#d4dbc4] space-y-2">
                    <SidebarItem icon={LogOut} label="Log Out" onClick={handleLogout} />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col h-full overflow-hidden bg-[#FAFAF7]">
                {/* Header */}
                <header className="flex items-center justify-between p-6 px-4 md:px-10 border-b border-[#e8e8e0]">
                    <div className="flex items-center gap-4 flex-grow max-w-2xl">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                            <input
                                placeholder="Search for courses, lessons..."
                                className="w-full glass-input pl-12 h-12 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 ml-6">
                        <button className="p-3 glass rounded-xl relative hover:scale-105 transition-transform">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900" />
                        </button>
                        <div className="flex items-center gap-3 glass p-1.5 pr-4 rounded-xl hover:bg-white/10 cursor-pointer transition-colors group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white overflow-hidden">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-6 h-6" />
                                )}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold leading-none mb-0.5">{displayName}</p>
                                <p className="text-[10px] text-slate-500 font-medium tracking-wider">PRO STUDENT</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto custom-scrollbar pb-20">
                    <CoursePlayer />
                </div>
            </main>
        </div>
    )
}

export default App
