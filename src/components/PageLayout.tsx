'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';

interface PageLayoutProps {
  children: ReactNode;
  activeStep: number;
  title?: string;
  description?: string;
}

export default function PageLayout({ children, activeStep, title = "E-Bike Tour Invoice Generator", description = "Create professional invoices for your e-bike tours" }: PageLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image src="/logo.png" alt="E-Bike Tour Logo" width={48} height={48} className="mr-4" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{title}</h1>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
            <Link href="/all-invoices" className="flex items-center bg-white px-3 py-1.5 border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              View All Invoices
            </Link>
          </div>

          {/* Progress Steps */}
          <div className="flex mb-5 bg-white p-3 rounded-lg shadow-sm">
            <div className={`flex items-center ${activeStep === 1 ? 'text-blue-600' : activeStep > 1 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-full ${activeStep === 1 ? 'bg-blue-600' : activeStep > 1 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2 text-xs`}>
                {activeStep > 1 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '1'
                )}
              </div>
              <span className="mr-4 text-sm">Tour Details</span>
            </div>
            <div className={`flex items-center ${activeStep === 2 ? 'text-blue-600' : activeStep > 2 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-full ${activeStep === 2 ? 'bg-blue-600' : activeStep > 2 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2 text-xs`}>
                {activeStep > 2 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '2'
                )}
              </div>
              <span className="mr-4 text-sm">Group Details</span>
            </div>
            <div className={`flex items-center ${activeStep === 3 ? 'text-blue-600' : activeStep > 3 ? 'text-green-600' : 'text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-full ${activeStep === 3 ? 'bg-blue-600' : activeStep > 3 ? 'bg-green-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2 text-xs`}>
                {activeStep > 3 ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '3'
                )}
              </div>
              <span className="mr-4 text-sm">Rates</span>
            </div>
            <div className={`flex items-center ${activeStep === 4 ? 'text-blue-600' : 'text-gray-500'}`}>
              <div className={`w-6 h-6 rounded-full ${activeStep === 4 ? 'bg-blue-600' : 'bg-gray-300'} text-white flex items-center justify-center mr-2 text-xs`}>
                4
              </div>
              <span className="text-sm">Preview</span>
            </div>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </div>
    </div>
  );
} 