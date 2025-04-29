'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">E</span>
        </div>
        <div>
          <h1 className="font-bold text-gray-800">E-Bike Tours</h1>
          <p className="text-xs text-gray-500">Invoice System</p>
        </div>
      </div>

      <div className="p-3 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-2">INVOICE MANAGEMENT</p>
        <Link 
          href="/dashboard" 
          className={`flex items-center p-2 rounded ${isActive('/dashboard') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Dashboard
        </Link>
      </div>

      <div className="p-3 border-b border-gray-200">
        <p className="text-xs font-semibold text-gray-500 mb-2">TOUR MANAGEMENT</p>
        <Link 
          href="/new-invoice" 
          className={`flex items-center p-2 rounded ${isActive('/new-invoice') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Tour
        </Link>
        <Link 
          href="/rider-information" 
          className={`flex items-center p-2 rounded ${isActive('/rider-information') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Rider Information
        </Link>
        <Link 
          href="/rates-pricing" 
          className={`flex items-center p-2 rounded ${isActive('/rates-pricing') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Rates & Pricing
        </Link>
        <Link 
          href="/preview" 
          className={`flex items-center p-2 rounded ${isActive('/preview') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-blue-50'}`}
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </Link>
      </div>

      <div className="mt-auto p-4 border-t border-gray-200 flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center mr-3">
          <span>A</span>
        </div>
        <div>
          <p className="text-sm font-medium">Admin User</p>
          <p className="text-xs text-gray-500">admin@ebike-tours.com</p>
        </div>
      </div>
    </div>
  );
} 