
import React, { useState } from 'react';
import { generateLessonPlan } from './services/geminiService';
import { FormData, LessonPlan, ClassLevel, Difficulty } from './types';
import Button from './components/Button';
import LessonPlanDisplay from './components/LessonPlanDisplay';
import { GraduationCap, Sparkles, BookOpen, ChevronRight, Layout, Info } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<LessonPlan | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    class: '6',
    subject: '',
    topic: '',
    difficulty: 'average'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.topic) {
      setError("Please fill in both Subject and Topic.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateLessonPlan(formData);
      setPlan(result);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Shikshak Saarathi</h1>
              <p className="text-[10px] uppercase tracking-widest text-indigo-600 font-bold mt-1">NEP 2020 • NCTE Aligned</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-500">
            <span className="hover:text-indigo-600 cursor-help flex items-center gap-1.5"><Info size={14} /> Guide</span>
            <span className="hover:text-indigo-600 cursor-pointer">Support</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-4 space-y-6 no-print">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-amber-500" size={18} />
                <h2 className="font-bold text-slate-800">Plan Generator</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Class</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['6', '7', '8'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormData({...formData, class: c as ClassLevel})}
                        className={`py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                          formData.class === c 
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700' 
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        Grade {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Science, Mathematics"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Electricity, Photosynthesis"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Difficulty Level</label>
                  <select
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none transition-all"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value as Difficulty})}
                  >
                    <option value="below basic">Below Basic</option>
                    <option value="average">Average (Standard)</option>
                    <option value="advanced">Advanced</option>
                    <option value="mixed">Mixed Ability</option>
                  </select>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-lg animate-pulse">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full mt-4" 
                  isLoading={loading}
                  variant="primary"
                >
                  Generate Plan <ChevronRight size={18} />
                </Button>
              </form>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl text-white overflow-hidden relative group">
              <Layout className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform" size={120} />
              <h3 className="text-lg font-bold mb-2">NEP 2020 Ready</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Our AI understands the latest pedagogical frameworks to include experiential learning, critical thinking, and competency-based assessments in every plan.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-8">
            {!plan && !loading && (
              <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-4 no-print">
                <div className="bg-white p-8 rounded-full shadow-inner border border-slate-100">
                  <BookOpen size={48} className="text-slate-200" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Your lesson plan will appear here</h3>
                  <p className="text-slate-400 max-w-sm mx-auto text-sm mt-1">
                    Select your class, subject and topic to get a comprehensive 6-period pedagogical plan instantly.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-6 no-print">
                <div className="h-20 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
                <div className="h-64 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
                <div className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
              </div>
            )}

            {plan && !loading && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <LessonPlanDisplay plan={plan} />
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 py-10 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Shikshak Saarathi. Supporting Indian Educators.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
