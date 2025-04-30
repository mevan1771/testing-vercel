'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';

export default function GroupDetailsPage() {
  const activeStep: number = 2;
  const [groupData, setGroupData] = useState({
    numberOfRiders: '1',
    singleRoomsRequired: '0',
    doubleRoomsRequired: '1',
    tourLeaderDiscount: '0',
    tourLeaderName: '',
    additionalNotes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Image src="/logo.png" alt="E-Bike Tour Logo" width={64} height={64} className="mr-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">E-Bike Tour Invoice Generator</h1>
                <p className="text-gray-600">Create professional invoices for your e-bike tours</p>
              </div>
            </div>
            <Link href="/all-invoices" className="flex items-center bg-white px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              View All Invoices
            </Link>
          </div>

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
              <span className="mr-4">Group Details</span>
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

          {/* Group Size & Accommodation */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-4">Group Size & Accommodation</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Riders</label>
                <input
                  type="number"
                  name="numberOfRiders"
                  min="1"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={groupData.numberOfRiders}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Single Rooms Required</label>
                <input
                  type="number"
                  name="singleRoomsRequired"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={groupData.singleRoomsRequired}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Double Rooms Required</label>
                <input
                  type="number"
                  name="doubleRoomsRequired"
                  min="0"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={groupData.doubleRoomsRequired}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour Leader Discount (%)</label>
                <input
                  type="number"
                  name="tourLeaderDiscount"
                  min="0"
                  max="100"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={groupData.tourLeaderDiscount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Tour Leader Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Tour Leader Information</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tour Leader Name</label>
              <input
                type="text"
                name="tourLeaderName"
                placeholder="Enter tour leader's full name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={groupData.tourLeaderName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requests or Notes</label>
              <textarea
                name="additionalNotes"
                rows={3}
                placeholder="Any special requirements or notes about the group"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={groupData.additionalNotes}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Link href="/new-invoice" className="text-blue-600 px-6 py-2 rounded flex items-center hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Tour Details
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