import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, ChevronRight, MessageSquare, Share2, Bookmark, Send, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabase } from '../lib/supabase';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface Lesson {
    id: string;
    title: string;
    duration_seconds: number;
    video_url: string;
    position: number;
    completed?: boolean;
    description?: string;
}

interface Comment {
    id: string;
    content: string;
    created_at: string;
    parent_id: string | null;
    profiles: {
        full_name: string;
        avatar_url: string;
    };
}

export const CoursePlayer: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetchLessons();
    }, []);

    useEffect(() => {
        if (activeLesson) {
            fetchComments();
            const subscription = subscribeToComments();
            return () => {
                subscription.unsubscribe();
            };
        }
    }, [activeLesson]);

    const fetchLessons = async () => {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .order('position', { ascending: true });

        if (!error && data) {
            setLessons(data);
            if (data.length > 0) setActiveLesson(data[0]);
        }
        setIsLoading(false);
    };

    const fetchComments = async () => {
        if (!activeLesson) return;
        const { data, error } = await supabase
            .from('comments')
            .select('*, profiles(full_name, avatar_url)')
            .eq('lesson_id', activeLesson.id)
            .order('created_at', { ascending: true });

        if (!error && data) setComments(data);
    };

    const subscribeToComments = () => {
        return supabase
            .channel('public:comments')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'comments',
                filter: `lesson_id=eq.${activeLesson?.id}`
            }, (payload) => {
                fetchComments(); // Refresh comments on new insertion
            })
            .subscribe();
    };

    const handleSendComment = async (parentId: string | null = null) => {
        if (!newComment.trim() || !activeLesson) return;
        setIsSending(true);

        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) {
            alert('Please login to comment');
            setIsSending(false);
            return;
        }

        const { error } = await supabase.from('comments').insert({
            content: newComment,
            lesson_id: activeLesson.id,
            user_id: userData.user.id,
            parent_id: parentId
        });

        if (!error) {
            setNewComment('');
        } else {
            alert(error.message);
        }
        setIsSending(false);
    };

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 text-[#344E41] animate-spin" />
            </div>
        );
    }

    if (!activeLesson) return <div className="p-10 text-center glass-card m-6">No lessons found. Please ensure you have data in your Supabase 'lessons' table.</div>;

    return (
        <div className="flex flex-col lg:flex-row h-full gap-6 p-4 lg:p-6 animate-in fade-in duration-700">
            {/* Main Content: Video & Details */}
            <div className="flex-grow space-y-6">
                {/* Custom Video Player Placeholder */}
                <div className="relative aspect-video bg-[#e0e2d5] rounded-[32px] overflow-hidden group border border-[#d4dbc4] shadow-xl">
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button className="w-20 h-20 flex items-center justify-center rounded-full bg-[#344E41]/90 text-white hover:scale-110 transition-transform shadow-2xl">
                            <Play className="w-10 h-10 fill-current ml-1" />
                        </button>
                    </div>
                    {/* Progress Bar Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <div className="h-full bg-[#344E41] w-1/3 shadow-[0_0_10px_rgba(52,78,65,0.8)]" />
                    </div>
                </div>

                {/* Video Info */}
                <div className="bg-[#EEF0E5] rounded-[32px] p-8 border border-[#d4dbc4] shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold mb-2 text-[#1a2e1a]">{activeLesson.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-[#4a6a4a]">
                                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {Math.floor(activeLesson.duration_seconds / 60)}:{(activeLesson.duration_seconds % 60).toString().padStart(2, '0')}</span>
                                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {comments.length} Comments</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 bg-white/50 border border-[#d4dbc4] rounded-xl hover:bg-white/80 transition-colors">
                                <Bookmark className="w-5 h-5 text-[#344E41]" />
                            </button>
                            <button className="p-2 bg-white/50 border border-[#d4dbc4] rounded-xl hover:bg-white/80 transition-colors">
                                <Share2 className="w-5 h-5 text-[#344E41]" />
                            </button>
                        </div>
                    </div>
                    <p className="text-[#4a6a4a] leading-relaxed">
                        {activeLesson.description || 'No description available for this lesson.'}
                    </p>
                </div>

                {/* Comment Section (Nested Support) */}
                <div className="bg-[#EEF0E5] rounded-[32px] p-8 border border-[#d4dbc4] shadow-sm">
                    <h2 className="text-xl font-bold mb-6 text-[#1a2e1a]">Comments</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#d4dbc4] flex-shrink-0 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 text-[#344E41] opacity-20" />
                            </div>
                            <div className="flex-grow flex gap-2">
                                <input
                                    className="w-full bg-white border border-[#d4dbc4] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#344E41]/30 transition-all"
                                    placeholder="Share your thoughts or questions..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendComment()}
                                />
                                <button
                                    onClick={() => handleSendComment()}
                                    disabled={isSending}
                                    className="p-2 bg-[#344E41] text-white rounded-xl hover:bg-[#2a3f34] transition-colors disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Real-time Comments List */}
                        <div className="space-y-4">
                            {comments.filter(c => !c.parent_id).map((comment) => (
                                <div key={comment.id} className="flex gap-4 animate-in slide-in-from-left duration-300">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0 flex items-center justify-center text-sm font-bold overflow-hidden">
                                        {comment.profiles?.avatar_url ? <img src={comment.profiles.avatar_url} className="w-10 h-10 object-cover" /> : comment.profiles?.full_name?.charAt(0)}
                                    </div>
                                    <div className="space-y-1 flex-grow">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-sm">{comment.profiles?.full_name || 'Anonymous'}</span>
                                            <span className="text-xs text-slate-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-sm text-[#4a6a4a]">
                                            {comment.content}
                                        </p>
                                        <button className="text-xs font-medium text-[#344E41] hover:underline">Reply</button>

                                        {/* Nested Support */}
                                        {comments.filter(reply => reply.parent_id === comment.id).map(reply => (
                                            <div key={reply.id} className="mt-4 ml-8 pl-4 border-l border-[#d4dbc4] space-y-4">
                                                <div className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#d4dbc4] flex-shrink-0 flex items-center justify-center text-xs font-bold overflow-hidden">
                                                        {reply.profiles?.full_name?.charAt(0)}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-xs text-[#1a2e1a]">{reply.profiles?.full_name || 'Anonymous'}</span>
                                                            <span className="text-[10px] text-[#4a6a4a]">{new Date(reply.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-xs text-[#4a6a4a]">
                                                            {reply.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-full lg:w-96 space-y-4">
                <div className="glass-card sticky top-6">
                    <h3 className="font-bold text-lg mb-4">Course Curriculum</h3>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {lessons.map((lesson) => (
                            <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className={cn(
                                    "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
                                    activeLesson?.id === lesson.id
                                        ? "bg-[#344E41] text-white shadow-lg shadow-[#344E41]/20"
                                        : "bg-white/50 border border-transparent hover:border-[#d4dbc4] hover:bg-white/80"
                                )}
                            >
                                <div className="flex items-center gap-3 text-left">
                                    {lesson.completed ? (
                                        <CheckCircle className={cn("w-5 h-5 flex-shrink-0", activeLesson?.id === lesson.id ? "text-white" : "text-[#344E41]")} />
                                    ) : (
                                        <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0", activeLesson?.id === lesson.id ? "border-white/50" : "border-[#d4dbc4]")} />
                                    )}
                                    <div>
                                        <div className="text-sm font-bold line-clamp-1">{lesson.title}</div>
                                        <div className={cn("text-[10px] opacity-70")}>
                                            {Math.floor(lesson.duration_seconds / 60)}:{(lesson.duration_seconds % 60).toString().padStart(2, '0')}
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className={cn("w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0", activeLesson?.id === lesson.id && "hidden")} />
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#d4dbc4]">
                        <div className="flex justify-between items-center text-sm font-bold text-[#1a2e1a] mb-2">
                            <span>Overall Progress</span>
                            <span>40%</span>
                        </div>
                        <div className="h-2 w-full bg-[#d4dbc4] rounded-full overflow-hidden">
                            <div className="h-full bg-[#344E41] w-[40%] rounded-full shadow-[0_0_10px_rgba(52,78,65,0.4)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
