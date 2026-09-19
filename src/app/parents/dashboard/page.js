'use client'

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearUser, selectUser } from '../../../../store/slices/studentSlice';
import { studentApi } from '@/lib/studenApi';
import { checkAuth } from '@/lib/chekAuth';

function page() {
  const parents = useSelector(selectUser);
  const router = useRouter();

const clearUserS = useSelector(clearUser)
  
   useEffect(() => {
          
          if (!parents) {
              checkAuth();
              if (!parents) {
                  router.push('/login');
              }
          } 
      }, []);

      
  const handleLogout = () => {
    studentApi.logout('/auth/parents/logout');
      dispatch(clearUserS);
        router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Parents Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Full Name</label>
                  <p className="text-gray-900 text-lg">{parents?.fullName}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Email</label>
                  <p className="text-gray-900 text-lg">{parents?.email}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Mobile Number</label>
                  <p className="text-gray-900 text-lg">{parents?.mobileNumber}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Relation</label>
                  <p className="text-gray-900 text-lg">{parents?.relation}</p>
                </div>
              </div>
            </div>

            {/* Address & Other Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Address & Details</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Occupation</label>
                  <p className="text-gray-900 text-lg">{parents?.occupation}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Village/City</label>
                  <p className="text-gray-900 text-lg">{parents?.address?.villageOrCity}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">Taluka</label>
                  <p className="text-gray-900 text-lg">{parents?.address?.taluka}</p>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-semibold">District</label>
                  <p className="text-gray-900 text-lg">{parents?.address?.district}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <div className="text-blue-500 text-3xl mb-3">👨‍👧‍👦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">View Children</h3>
            <p className="text-gray-600">Monitor your children's academic progress and performance</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <div className="text-green-500 text-3xl mb-3">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Attendance</h3>
            <p className="text-gray-600">Check attendance records and notifications</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition">
            <div className="text-yellow-500 text-3xl mb-3">📝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Results</h3>
            <p className="text-gray-600">View exam results and academic reports</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
