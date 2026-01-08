
import React from 'react';
import { LessonPlan } from '../types';
import { FileText, Printer, CheckCircle2, BookOpen, PenTool, Lightbulb, ClipboardList, HelpCircle } from 'lucide-react';

interface Props {
  plan: LessonPlan;
}

const SectionHeader: React.FC<{ icon: React.ReactNode; title: string }> = ({ icon, title }) => (
  <div className="flex items-center gap-3 border-b border-slate-200 pb-2 mb-4 mt-8">
    <span className="text-indigo-600 print:text-slate-800">{icon}</span>
    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-wide print:text-black">{title}</h3>
  </div>
);

const LessonPlanDisplay: React.FC<Props> = ({ plan }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
      {/* Header / Basic Info */}
      <div className="bg-slate-50 px-8 py-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 print:bg-white print:border-b-2 print:border-black">
        <div>
          <h2 className="text-2xl font-serif font-bold text-indigo-900 print:text-black">
            {plan.basicInfo.topic}
          </h2>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 print:text-black">
            <span className="flex items-center gap-1.5"><FileText size={16} /> Class: {plan.basicInfo.class}</span>
            <span className="flex items-center gap-1.5"><BookOpen size={16} /> Subject: {plan.basicInfo.subject}</span>
            <span className="flex items-center gap-1.5"><HelpCircle size={16} /> Difficulty: {plan.basicInfo.difficulty}</span>
            <span className="flex items-center gap-1.5"><ClipboardList size={16} /> Periods: {plan.periods.length} (40 min each)</span>
          </div>
        </div>
        <button 
          onClick={handlePrint}
          className="no-print flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors"
        >
          <Printer size={18} /> Print Plan
        </button>
      </div>

      <div className="px-8 py-6 space-y-4">
        {/* Learning Outcomes */}
        <SectionHeader icon={<CheckCircle2 size={22} />} title="Learning Outcomes" />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.learningOutcomes.map((outcome, idx) => (
            <li key={idx} className="flex gap-3 text-slate-700 print:text-black">
              <div className="h-5 w-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-bold shrink-0 mt-0.5 print:hidden">
                {idx + 1}
              </div>
              <span className="text-sm leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>

        {/* TLM */}
        <SectionHeader icon={<PenTool size={22} />} title="TLM (Teaching-Learning Materials)" />
        <div className="flex flex-wrap gap-2">
          {plan.tlm.map((item, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-200 print:bg-white print:border-black print:text-black">
              • {item}
            </span>
          ))}
        </div>

        {/* Period-wise Plan */}
        <SectionHeader icon={<BookOpen size={22} />} title="Period-wise Plan" />
        <div className="space-y-8">
          {plan.periods.map((period) => (
            <div key={period.period} className="relative pl-8 border-l-2 border-indigo-100 print:border-slate-300 pb-2">
              <div className="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-indigo-600 print:bg-black"></div>
              <h4 className="font-bold text-indigo-900 text-lg mb-4 print:text-black">
                Period {period.period}: <span className="font-normal text-slate-600 italic print:text-black print:not-italic">{period.objective}</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-indigo-50/50 p-4 rounded-lg print:bg-white print:p-0">
                  <h5 className="text-xs font-bold uppercase text-indigo-600 mb-2 flex items-center gap-2 print:text-black">
                    <Lightbulb size={14} /> Main Activity
                  </h5>
                  <p className="text-sm text-slate-800 leading-relaxed print:text-black">
                    {period.activity}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-emerald-100 bg-emerald-50/30 p-4 rounded-lg print:border-slate-300 print:bg-white">
                    <h5 className="text-xs font-bold uppercase text-emerald-700 mb-2 print:text-black">Quick Check</h5>
                    <p className="text-sm text-slate-800 italic print:text-black">
                      "{period.quickCheck}"
                    </p>
                  </div>
                  <div className="border border-orange-100 bg-orange-50/30 p-4 rounded-lg print:border-slate-300 print:bg-white">
                    <h5 className="text-xs font-bold uppercase text-orange-700 mb-2 print:text-black">Homework</h5>
                    <p className="text-sm text-slate-800 print:text-black">
                      {period.homework}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Assessment Plan */}
        <SectionHeader icon={<ClipboardList size={22} />} title="Assessment Plan" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h5 className="text-sm font-bold text-slate-800">Ongoing Assessment</h5>
            <ul className="list-disc list-inside space-y-1">
              {plan.assessmentPlan.ongoing.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-600 print:text-black">{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-bold text-slate-800">Summative Task</h5>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg print:bg-white print:border-slate-300">
              <p className="text-sm text-slate-700 print:text-black font-medium">{plan.assessmentPlan.summative}</p>
            </div>
          </div>
        </div>

        {/* Reflection */}
        <SectionHeader icon={<HelpCircle size={22} />} title="Teacher Reflection" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plan.teacherReflection.map((q, idx) => (
            <div key={idx} className="p-3 border border-slate-100 rounded bg-slate-50/50 italic text-slate-600 text-xs print:text-black print:bg-white print:border-slate-200">
              "{q}"
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 py-6 bg-slate-100 text-center text-[10px] text-slate-400 print:bg-white print:text-black border-t border-slate-200 mt-8">
        Generated by Shikshak Saarathi • Aligned with NEP 2020 & NCTE Standards • Middle School Lesson Plan
      </div>
    </div>
  );
};

export default LessonPlanDisplay;
