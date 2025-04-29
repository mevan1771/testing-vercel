'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function NewInvoicePage() {
  const activeStep: number = 1;
  const [invoiceData, setInvoiceData] = useState({
    tourName: '',
    invoiceNumber: 'INV-225',
    startDate: '',
    endDate: '',
    invoiceDate: '29/04/2025'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
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
            <div className={`flex items-center ${activeStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 1 ? 'bg-blue-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                1
              </div>
              <span className="mr-4">Tour Details</span>
            </div>
            <div className={`flex items-center ${activeStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 2 ? 'bg-blue-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
                2
              </div>
              <span className="mr-4">Rider Info</span>
            </div>
            <div className={`flex items-center ${activeStep === 3 ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full ${activeStep === 3 ? 'bg-blue-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2`}>
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

          {/* Tour Information Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Tour Information</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name</label>
                <input
                  type="text"
                  name="tourName"
                  placeholder="E.g. Tanzania E-Bike Adventure"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={invoiceData.tourName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={invoiceData.invoiceNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="text"
                    name="startDate"
                    placeholder="dd/mm/yyyy"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={invoiceData.startDate}
                    onChange={handleChange}
                  />
                  <div className="absolute right-2 top-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="text"
                    name="endDate"
                    placeholder="dd/mm/yyyy"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={invoiceData.endDate}
                    onChange={handleChange}
                  />
                  <div className="absolute right-2 top-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
              <div className="relative">
                <input
                  type="text"
                  name="invoiceDate"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={invoiceData.invoiceDate}
                  onChange={handleChange}
                />
                <div className="absolute right-2 top-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <div className="mt-6 flex justify-end">
            <Link href="/rider-information" className="bg-blue-600 text-white px-6 py-2 rounded flex items-center hover:bg-blue-700 transition-colors">
              Next: Rider Information
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