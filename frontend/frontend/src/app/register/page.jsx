"use client"

import { useState } from 'react';
import { Check, User, Mail, UserCog, X, ArrowRight, Stethoscope } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', specialization: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send user info
      const userRes = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }),
      });

      if (!userRes.ok) throw new Error('User registration failed');

      // If doctor, send additional info
      if (formData.role === 'DOCTOR') {
        const doctorRes = await fetch('http://localhost:8080/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            specialization: formData.specialization,
            available: true,
          }),
        });

        if (!doctorRes.ok) throw new Error('Doctor registration failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showSpecialization = formData.role === 'DOCTOR';

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white shadow-2xl rounded-2xl p-8 text-center transform transition-all animate-fadeIn">
        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Registration Successful!</h2>
        <p className="text-gray-600 mb-8 text-lg">Thank you for registering with our healthcare platform.</p>
        <button 
          onClick={() => {
            setFormData({ name: '', email: '', role: '', specialization: '' });
            setSubmitted(false);
          }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center mx-auto">
          <span>Register Another</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all">
      <div className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 py-8 px-8 relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Z" fill="white" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-purple-100 mt-2 text-lg">Join our healthcare platform</p>
        <div className="absolute -bottom-5 right-10 w-16 h-16 bg-pink-500 rounded-full opacity-20"></div>
        <div className="absolute -top-8 left-20 w-20 h-20 bg-blue-500 rounded-full opacity-20"></div>
      </div>

      <div className="p-8 bg-gradient-to-b from-white to-gray-50">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start animate-shake">
            <X className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-400" />
              </div>
              <input 
                type="text" 
                required
                placeholder="John Doe" 
                className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-purple-400" />
              </div>
              <input 
                type="email" 
                required
                placeholder="your@email.com" 
                className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCog className="h-5 w-5 text-purple-400" />
              </div>
              <select 
                required
                className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="" disabled>Select your role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="PATIENT">Patient</option>
              </select>
            </div>
          </div>

          {showSpecialization && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Stethoscope className="h-5 w-5 text-purple-400" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Neurology" 
                  className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg transition-all ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <a href="#" className="font-medium text-purple-600 hover:text-purple-500 ml-1 transition-colors">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
