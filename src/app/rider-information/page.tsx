'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function RiderInformationPage() {
  const activeStep: number = 2;
  const [riderData, setRiderData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRiderData({
      ...riderData,
      [name]: value
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">New Invoice</h1>

          {/* Progress Steps */}
          <div className="flex mb-8">
            <div className={`flex items-center ${activeStep === 1 ? 'text-blue-600' : activeStep > 1 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 1 ? 'bg-blue-600' : activeStep > 1 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                {activeStep > 1 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '1'
                )}
              </div>
              <span className="mr-4">Tour Details</span>
            </div>
            <div className={`flex items-center ${activeStep === 2 ? 'text-blue-600' : activeStep > 2 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 2 ? 'bg-blue-600' : activeStep > 2 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                2
              </div>
              <span className="mr-4">Rider Info</span>
            </div>
            <div className={`flex items-center ${activeStep === 3 ? 'text-blue-600' : activeStep > 3 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 3 ? 'bg-blue-600' : activeStep > 3 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                3
              </div>
              <span className="mr-4">Rates</span>
            </div>
            <div className={`flex items-center ${activeStep === 4 ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 4 ? 'bg-blue-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                4
              </div>
              <span>Preview</span>
            </div>
          </div>

          {/* Rider Information Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Rider Information</h2>
            
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.firstName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">Address</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <textarea
                  name="address"
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={riderData.city}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={riderData.country}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mt-4 max-w-xs">
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={riderData.postalCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Link href="/new-invoice" className="text-blue-600 px-6 py-2 rounded flex items-center hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back: Tour Details
            </Link>
            
            <Link href="/rates-pricing" className="bg-blue-600 text-white px-6 py-2 rounded flex items-center hover:bg-blue-700 transition-colors">
              Next: Rates
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 