"use client"

import { useEffect, useState } from 'react';
import { User, Loader, X, Search, Award, Phone, Calendar, Heart } from 'lucide-react';

// Define specialization colors
const specializationColors = {
  "Cardiology": { bg: "bg-red-100", text: "text-red-700", icon: "text-red-500", border: "border-red-200" },
  "Neurology": { bg: "bg-purple-100", text: "text-purple-700", icon: "text-purple-500", border: "border-purple-200" },
  "Pediatrics": { bg: "bg-blue-100", text: "text-blue-700", icon: "text-blue-500", border: "border-blue-200" },
  "Orthopedics": { bg: "bg-amber-100", text: "text-amber-700", icon: "text-amber-500", border: "border-amber-200" },
  "Dermatology": { bg: "bg-pink-100", text: "text-pink-700", icon: "text-pink-500", border: "border-pink-200" },
  "Ophthalmology": { bg: "bg-teal-100", text: "text-teal-700", icon: "text-teal-500", border: "border-teal-200" },
  "General Practice": { bg: "bg-emerald-100", text: "text-emerald-700", icon: "text-emerald-500", border: "border-emerald-200" },
  // Default color for any other specialization
  "default": { bg: "bg-gray-100", text: "text-gray-700", icon: "text-gray-500", border: "border-gray-200" }
};

// Helper function to get color scheme based on specialization
const getColorScheme = (specialization) => {
  return specializationColors[specialization] || specializationColors["default"];
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/doctors')
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch doctors");
        setLoading(false);
      });
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 rounded-2xl px-8 py-10 mb-10 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500 opacity-10 rounded-full -mb-10 -ml-10"></div>
        
        <h1 className="text-4xl font-bold text-white relative z-10">Find Your Doctor</h1>
        <p className="text-purple-100 mt-3 text-lg max-w-2xl relative z-10">
          Connect with the best healthcare specialists tailored to your specific needs
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 relative z-10 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-purple-500" />
          </div>
          <input
            type="text"
            placeholder="Search by name or specialization..."
            className="pl-12 w-full px-5 py-4 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-lg text-gray-700 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-5 rounded-lg flex items-start animate-pulse">
          <X className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col justify-center items-center py-16 bg-white rounded-2xl shadow-md">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mb-4" />
          <span className="text-gray-600 text-lg">Loading doctors...</span>
        </div>
      ) : filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doc => {
            const colorScheme = getColorScheme(doc.specialization || "General Practice");
            const isHovered = hoveredCard === doc.id;
            
            return (
              <div 
                key={doc.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border ${colorScheme.border} transform ${isHovered ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredCard(doc.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`${colorScheme.bg} px-6 py-5 border-b ${colorScheme.border}`}>
                  <div className="flex items-center">
                    <div className={`${colorScheme.bg} rounded-full p-3 mr-4 shadow-md`}>
                      <User className={`h-7 w-7 ${colorScheme.icon}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>
                      <p className={`${colorScheme.text} font-medium text-sm`}>
                        {doc.specialization || "General Practice"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start mb-5">
                    <Award className={`h-5 w-5 ${colorScheme.icon} mr-3 mt-0.5 flex-shrink-0`} />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Specialization</p>
                      <p className={`${colorScheme.text} font-semibold`}>{doc.specialization || "General Practice"}</p>
                    </div>
                  </div>
                  
                  {doc.experience && (
                    <div className="flex items-start mb-5">
                      <svg className={`h-5 w-5 ${colorScheme.icon} mr-3 mt-0.5 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Experience</p>
                        <p className="text-gray-800 font-semibold">{doc.experience} years</p>
                      </div>
                    </div>
                  )}
                  
                  {doc.phone && (
                    <div className="flex items-start mb-5">
                      <Phone className={`h-5 w-5 ${colorScheme.icon} mr-3 mt-0.5 flex-shrink-0`} />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Contact</p>
                        <p className="text-gray-800 font-semibold">{doc.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 flex space-x-3">
                    <button className={`flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-medium`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Appointment
                    </button>
                    <button className={`p-3 ${colorScheme.bg} ${colorScheme.text} rounded-xl shadow-md hover:shadow-lg transition-all duration-200`}>
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <svg className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">No doctors found</h3>
          <p className="mt-2 text-gray-500 text-lg max-w-md mx-auto">We couldn't find any doctors matching your search criteria. Try adjusting your search terms.</p>
          <button 
            onClick={() => setSearchTerm('')}
            className="mt-6 px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
