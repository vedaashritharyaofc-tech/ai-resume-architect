import React from 'react';

const ScoreCard = ({ scoreData }) => {
  if (!scoreData) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">ATS Match Score</h2>
        <div className={`text-3xl font-bold ${getScoreColor(scoreData.score)}`}>
          {scoreData.score}/100
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className={`${getBgColor(scoreData.score)} h-2.5 rounded-full transition-all duration-1000`} 
          style={{ width: `${scoreData.score}%` }}
        ></div>
      </div>

      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-semibold text-emerald-600 mb-1 flex items-center gap-2">
            <span>✓</span> Strengths
          </h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {scoreData.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        {scoreData.missing_keywords && scoreData.missing_keywords.length > 0 && (
          <div>
            <h3 className="font-semibold text-red-500 mb-1 flex items-center gap-2">
              <span>✗</span> Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {scoreData.missing_keywords.map((k, i) => (
                <span key={i} className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs border border-red-100">
                  {k}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="font-semibold text-indigo-500 mb-1 flex items-center gap-2">
            <span>💡</span> Improvement Suggestions
          </h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {scoreData.improvement_suggestions.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;