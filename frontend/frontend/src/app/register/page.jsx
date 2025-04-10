"use client"
import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('User registered successfully!');
      } else {
        alert('Failed to register user.');
      }
    } catch (error) {
      alert('Error occurred during registration.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Register User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border" placeholder="Name"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input className="w-full p-2 border" placeholder="Email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <select className="w-full p-2 border"
          onChange={e => setFormData({ ...formData, role: e.target.value })}>
          <option value="">Select Role</option>
          <option value="DOCTOR">Doctor</option>
          <option value="PATIENT">Patient</option>
        </select>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
}
