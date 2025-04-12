"use client"

import { useEffect, useState } from "react"
import { Calendar, User, UserCog, Clock, CheckCircle, XCircle, AlertCircle, CalendarDays } from "lucide-react"

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    status: "Scheduled",
  })

  // Fetch existing appointments
  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:8080/api/appointments/doctor/1")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch appointments")
        return res.json()
      })
      .then((data) => {
        setAppointments(data)
        setLoading(false)
      })
      .catch((err) => {
        setError("Failed to fetch appointments. Please try again.")
        setLoading(false)
      })
  }, [])

  // Submit new appointment
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:8080/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess("Appointment scheduled successfully!")
        // Fetch updated appointments
        const updatedAppointments = await fetch("http://localhost:8080/api/appointments").then((res) => res.json())
        setAppointments(updatedAppointments)

        // Reset form
        setForm({
          patientId: "",
          doctorId: "",
          appointmentDate: "",
          status: "Scheduled",
        })
      } else {
        setError("Failed to schedule appointment. Please try again.")
      }
    } catch (err) {
      setError("Connection error. Please check your network.")
    } finally {
      setSubmitting(false)
    }
  }

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Scheduled":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: <Clock className="w-4 h-4 mr-1 text-blue-600" />,
        }
      case "Completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          icon: <CheckCircle className="w-4 h-4 mr-1 text-green-600" />,
        }
      case "Cancelled":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          icon: <XCircle className="w-4 h-4 mr-1 text-red-600" />,
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: <AlertCircle className="w-4 h-4 mr-1 text-gray-600" />,
        }
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 space-y-8 px-4 sm:px-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 rounded-2xl px-8 py-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500 opacity-10 rounded-full -mb-10 -ml-10"></div>

        <h1 className="text-3xl font-bold text-white relative z-10 mb-2">Appointment Management</h1>
        <p className="text-indigo-100 relative z-10">Schedule and manage patient appointments</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start animate-shake">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg flex items-start animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-green-700">{success}</p>
        </div>
      )}

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <Calendar className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Schedule New Appointment</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Patient Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter patient Name"
                  value={form.patientId}
                  onChange={(e) => setForm({ ...form, patientId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCog className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  placeholder="Enter doctor Name"
                  value={form.doctorId}
                  onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Appointment Date & Time</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarDays className="h-5 w-5 text-purple-400" />
                </div>
                <input
                  className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  type="datetime-local"
                  value={form.appointmentDate}
                  onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-purple-400" />
                </div>
                <select
                  className="pl-10 w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-all"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-purple-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-5 w-5" />
                Book Appointment
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
        <div className="flex items-center mb-6">
          <CalendarDays className="h-6 w-6 text-purple-500 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Appointments</h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : appointments.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {appointments.map((appt) => {
              console.log(appt)
              const statusColor = getStatusColor(appt.status)
              return (
                <li key={appt.id} className="py-5 hover:bg-gray-50 rounded-lg px-4 transition-colors">
                  <div className="flex flex-wrap justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}
                        >
                          {statusColor.icon}
                          {appt.status}
                        </span>
                      </div>

                      <div className="flex items-start space-x-6">
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Doctor</p>
                          <div className="flex items-center">
                            <UserCog className="h-4 w-4 text-purple-500 mr-1" />
                            <p className="font-semibold text-gray-800">ID: {appt.doctorId}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 font-medium">Patient</p>
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-purple-500 mr-1" />
                            <p className="font-semibold text-gray-800">ID: {appt.patientId}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <CalendarDays className="h-5 w-5 text-purple-500 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Appointment Time</p>
                        <p className="font-semibold text-gray-800">{new Date(appt.appointmentDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Appointments Found</h3>
            <p className="text-gray-600">There are no scheduled appointments at this time.</p>
          </div>
        )}
      </div>
    </div>
  )
}
