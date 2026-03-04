import React, { useState } from 'react';
import { Mail, Lock, Chrome, Github, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: window.location.origin,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAF7]">
            <div className="w-full max-w-md space-y-8 animate-in zoom-in duration-500">
                <div className="text-center">
                    <div className="w-16 h-16 bg-[#344E41] rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-xl shadow-[#344E41]/20">E</div>
                    <h1 className="text-3xl font-bold text-[#1a2e1a]">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className="text-[#4a6a4a] mt-2">Start your learning journey today</p>
                </div>

                <div className="bg-[#EEF0E5] rounded-[32px] p-10 shadow-xl space-y-6">
                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium ml-1 text-[#1a2e1a]">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        className="w-full glass-input pl-10"
                                        placeholder="name@example.com"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium ml-1 text-[#1a2e1a]">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        className="w-full glass-input pl-10"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-[#344E41] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:bg-[#2a3f34] transition-all shadow-lg shadow-[#344E41]/20 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-[#d4dbc4]" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#EEF0E5] px-2 text-[#4a6a4a]">Or continue with</span></div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="flex-1 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <Chrome className="w-5 h-5 mr-2" />
                            Google
                        </button>
                        <button
                            onClick={() => handleSocialLogin('github')}
                            className="flex-1 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <Github className="w-5 h-5 mr-2" />
                            GitHub
                        </button>
                    </div>
                </div>

                <p className="text-center text-sm text-[#4a6a4a]">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError(null);
                        }}
                        className="ml-1 text-[#344E41] font-bold hover:underline"
                    >
                        {isLogin ? 'Create one' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};
