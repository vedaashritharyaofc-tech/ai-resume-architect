import React, { useState } from 'react';
import axios from 'axios';
import { Wand2, Target, Download, FileText, CheckCircle2 } from 'lucide-react';
import Form from '../components/Form';
import ResumePreview from '../components/ResumePreview';
import ScoreCard from '../components/ScoreCard';

const API_BASE = 'http://localhost:8000/api';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', education: '',
    skills: '', projects: '', experience: '', target_role: '', job_description: ''
  });
  
  const [resumeHtml, setResumeHtml] = useState('');
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState({ generate: false, score: false, optimize: false, pdf: false });

  // ... (API calls remain exactly the same)
  const handleGenerate = async () => {
    setLoading(l => ({ ...l, generate: true }));
    try {
      const res = await axios.post(`${API_BASE}/generate-resume`, formData);
      setResumeHtml(res.data.html);
      setScoreData(null); 
    } catch (err) { alert("Error generating resume"); }
    setLoading(l => ({ ...l, generate: false }));
  };

  const handleScore = async () => {
    if (!resumeHtml) return alert("Generate a resume first!");
    setLoading(l => ({ ...l, score: true }));
    try {
      const res = await axios.post(`${API_BASE}/score-resume`, { resume_html: resumeHtml, target_role: formData.target_role || 'General' });
      setScoreData(res.data);
    } catch (err) { alert("Error scoring resume"); }
    setLoading(l => ({ ...l, score: false }));
  };

  const handleOptimize = async () => {
    if (!resumeHtml || !formData.job_description) return alert("Please provide a job description first!");
    setLoading(l => ({ ...l, optimize: true }));
    try {
      const res = await axios.post(`${API_BASE}/optimize-resume`, { resume_html: resumeHtml, job_description: formData.job_description });
      setResumeHtml(res.data.html);
      handleScore(); 
    } catch (err) { alert("Error optimizing resume"); }
    setLoading(l => ({ ...l, optimize: false }));
  };

  const handleDownload = async () => {
    if (!resumeHtml) return;
    setLoading(l => ({ ...l, pdf: true }));
    try {
      const res = await axios.post(`${API_BASE}/download-pdf`, { html_content: resumeHtml }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'AI_Resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) { alert("Error downloading PDF"); }
    setLoading(l => ({ ...l, pdf: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Controls */}
        <div className="xl:col-span-5 space-y-6">
          <Form formData={formData} setFormData={setFormData} />
          
          {/* Dynamic Action Panel */}
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-indigo-600" /> AI Engine Controls
            </h3>
            
            <div className="flex flex-col gap-3">
              <button onClick={handleGenerate} disabled={loading.generate}
                className="group relative w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-70 shadow-md hover:shadow-indigo-500/30">
                {loading.generate ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FileText className="w-5 h-5" />}
                {loading.generate ? 'AI is Writing...' : '1. Generate Base Resume'}
              </button>

              <button onClick={handleScore} disabled={!resumeHtml || loading.score}
                className="group relative w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50">
                {loading.score ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle2 className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />}
                {loading.score ? 'Analyzing...' : '2. Analyze ATS Score'}
              </button>

              <button onClick={handleOptimize} disabled={!resumeHtml || !formData.job_description || loading.optimize}
                className="group relative w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-semibold transition-all disabled:opacity-50 shadow-md hover:shadow-emerald-500/30">
                {loading.optimize ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Target className="w-5 h-5" />}
                {loading.optimize ? 'Optimizing...' : '3. Tailor to Job Description'}
              </button>
            </div>
          </div>

          <ScoreCard scoreData={scoreData} />
        </div>

        {/* Right Column: Visual Preview */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> Document Preview
            </h2>
            <button onClick={handleDownload} disabled={!resumeHtml || loading.pdf}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 shadow-sm">
              {loading.pdf ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
              Export PDF
            </button>
          </div>
          <ResumePreview html={resumeHtml} />
        </div>

      </div>
    </div>
  );
};

export default Home;