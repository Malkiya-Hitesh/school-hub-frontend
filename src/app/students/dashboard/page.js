'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {   clearUser, selectIsLoggedIn, selectUser, setUser } from '../../../../store/slices/studentSlice';
import { studentApi } from '@/lib/studenApi';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/chekAuth';

function page() {
const student = useSelector(selectUser);
    const dispatch = useDispatch()
const clearUserS = useSelector(clearUser)
    const router = useRouter()

 useEffect(() => {
        
        if (!student) {
            checkAuth();
            if (!student) {
                router.push('/login');
            }
        } 
    }, []);

const handleLogout = () => {
    studentApi.logout('/auth/students/logout');
    dispatch(clearUserS);
  

    router.push('/login');
}

    
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-15">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
          >
            Logout
          </button>
        </div>

        {student ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold text-gray-700">Full Name:</span> {student.fullName}</p>
                  <p><span className="font-semibold text-gray-700">Email:</span> {student.email}</p>
                  <p><span className="font-semibold text-gray-700">Gender:</span> {student.gender}</p>
                  <p><span className="font-semibold text-gray-700">Date of Birth:</span> {new Date(student.dateOfBirth).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Academic Information</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold text-gray-700">School Name:</span> {student.schoolName}</p>
                  <p><span className="font-semibold text-gray-700">Current Standard:</span> {student.currentStandard}</p>
                  <p><span className="font-semibold text-gray-700">Medium:</span> {student.medium}</p>
                  <p><span className="font-semibold text-gray-700">Academic Year:</span> {student.academicYear}</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Address</h2>
                <div className="space-y-3">
                  <p><span className="font-semibold text-gray-700">Village/City:</span> {student.address?.villageOrCity}</p>
                  <p><span className="font-semibold text-gray-700">Taluka:</span> {student.address?.taluka}</p>
                  <p><span className="font-semibold text-gray-700">District:</span> {student.address?.district}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">Loading student information...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
