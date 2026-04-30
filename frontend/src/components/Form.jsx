import React from 'react';

const Form = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">Your Details</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Role</label>
          <input type="text" name="target_role" value={formData.target_role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Software Engineer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Comma separated)</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
          <textarea name="experience" value={formData.experience} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
          <textarea name="education" value={formData.education} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
          <textarea name="projects" value={formData.projects} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
        </div>
        <hr className="my-4 border-gray-200" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Job Description (For Optimization)</label>
          <textarea name="job_description" value={formData.job_description} onChange={handleChange} rows={4} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 outline-none resize-none placeholder-gray-400" placeholder="Paste the job description here before clicking Optimize..." />
        </div>
      </div>
    </div>
  );
};

export default Form;