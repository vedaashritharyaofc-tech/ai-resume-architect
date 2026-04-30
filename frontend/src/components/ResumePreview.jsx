import React from 'react';

const ResumePreview = ({ html }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[800px] w-full overflow-y-auto">
      {html ? (
        <div 
          className="resume-preview-content text-gray-800 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[600px] text-gray-400">
          <svg className="w-16 h-16 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p>Your generated resume will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;