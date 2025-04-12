"use client"

import { useEffect, useState } from "react"
import { Search, CreditCard, CheckCircle, AlertCircle, ArrowRight, Receipt } from 'lucide-react'

export default function Billing() {
  const [bills, setBills] = useState([])
  const [patientId, setPatientId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchBills = () => {
    if (!patientId.trim()) {
      setError("Please enter a patient ID")
      return
    }

    setLoading(true)
    setError(null)
    
    fetch(`http://localhost:8080/api/billing/patient/${patientId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch invoices")
        return res.json()
      })
      .then((data) => {
        setBills(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch invoices. Please try again.")
        setLoading(false)
      })
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-8 px-4 sm:px-6">
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 rounded-2xl px-8 py-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 opacity-10 rounded-full -mb-10 -ml-10"></div>
        
        <h1 className="text-3xl font-bold text-white relative z-10 mb-2">Billing & Invoices</h1>
        <p className="text-purple-100 relative z-10 mb-6">View and manage patient billing information</p>
        
        <div className="relative z-10 bg-white p-1 rounded-xl shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-purple-400" />
              </div>
              <input
                className="pl-10 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="Enter Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>
            <button
              onClick={fetchBills}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center font-medium disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Get Bills
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {bills.length > 0 && (
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 animate-fadeIn">
          <div className="flex items-center mb-6">
            <Receipt className="h-6 w-6 text-purple-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Patient Invoices</h2>
          </div>
          
          <ul className="space-y-4">
            {bills.map((bill) => (
              <li 
                key={bill.id} 
                className="border border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gray-50"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
                      <p className="font-semibold text-gray-800">Invoice #{bill.id}</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">₹{bill.amount.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      bill.status === "PAID" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {bill.status === "PAID" ? (
                        <CheckCircle className="w-4 h-4 mr-1" />
                      ) : (
                        <AlertCircle className="w-4 h-4 mr-1" />
                      )}
                      {bill.status}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <p>Issue Date: {new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center transition-colors">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {bills.length===0 && patientId && !loading && !error && (
        <div className="bg-white shadow-md rounded-xl p-8 text-center border border-gray-100">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Receipt className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Invoices Found</h3>
          <p className="text-gray-600">There are no billing records for this patient ID.</p>
        </div>
      )}
    </div>
  )
}
