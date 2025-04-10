"use client"
import { useEffect, useState } from 'react';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/doctors/1/appointments')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => alert('Error fetching doctors'));
  }, []);

  useEffect(() => {
    console.log(doctors)
  }, [doctors]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
      <ul className="space-y-4">
        {doctors.map((doc) => (
          <li key={doc.id} className="border p-4 rounded shadow">
            <p className="text-lg font-semibold">{doc.status}</p>
            <p className="text-sm text-gray-600">{doc.patientId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
