'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function PreviewPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // In a real application, these values would be gathered from a state management system
  // or URL parameters, but for this demo they are hardcoded
  const invoiceData = {
    tourName: 'Tanzania E-Bike Adventure',
    invoiceNumber: 'INV-225',
    startDate: '15/05/2025',
    endDate: '22/05/2025',
    invoiceDate: '29/04/2025',
    
    customer: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street',
      city: 'New York',
      country: 'USA',
      postalCode: '10001'
    },
    
    pricing: {
      basicRate: 1200,
      numberOfRiders: 2,
      hotelUpgrade: true,
      hotelUpgradeRate: 300,
      airportTransfer: true,
      airportTransferRate: 75,
      bikeUpgrade: false,
      bikeUpgradeRate: 150,
      discount: 10,
      discountType: 'percentage'
    }
  };

  const calculateSubtotal = () => {
    let subtotal = invoiceData.pricing.basicRate * invoiceData.pricing.numberOfRiders;
    
    if (invoiceData.pricing.hotelUpgrade) {
      subtotal += invoiceData.pricing.hotelUpgradeRate * invoiceData.pricing.numberOfRiders;
    }
    
    if (invoiceData.pricing.airportTransfer) {
      subtotal += invoiceData.pricing.airportTransferRate;
    }
    
    if (invoiceData.pricing.bikeUpgrade) {
      subtotal += invoiceData.pricing.bikeUpgradeRate * invoiceData.pricing.numberOfRiders;
    }
    
    return subtotal;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (invoiceData.pricing.discountType === 'percentage') {
      return (subtotal * Number(invoiceData.pricing.discount)) / 100;
    } else {
      return Number(invoiceData.pricing.discount);
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to save invoice
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to success page or dashboard in a real app
      window.location.href = '/dashboard';
    }, 1500);
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
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mr-4">Tour Details</span>
            </div>
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mr-4">Rider Info</span>
            </div>
            <div className="flex items-center text-green-600">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mr-4">Rates</span>
            </div>
            <div className="flex items-center text-blue-600">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mr-2">
                4
              </div>
              <span>Preview</span>
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">E</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">E-Bike Tours</h2>
                    <p className="text-sm text-gray-500">Invoice #{invoiceData.invoiceNumber}</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">123 Adventure Road<br />Safari City, TZ 98765<br />info@ebike-tours.com</p>
              </div>
              
              <div className="text-right">
                <p className="font-medium text-lg">INVOICE</p>
                <p className="text-gray-600 mt-1">Date: {invoiceData.invoiceDate}</p>
                <p className="text-gray-600">Due Date: {invoiceData.startDate}</p>
              </div>
            </div>
            
            {/* Tour & Customer Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Tour Details</h3>
                <p className="font-bold text-lg mb-2">{invoiceData.tourName}</p>
                <p className="text-gray-600">Start Date: {invoiceData.startDate}</p>
                <p className="text-gray-600">End Date: {invoiceData.endDate}</p>
                <p className="text-gray-600">Number of Riders: {invoiceData.pricing.numberOfRiders}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3 text-gray-700">Billed To</h3>
                <p className="font-bold text-lg mb-2">{invoiceData.customer.firstName} {invoiceData.customer.lastName}</p>
                <p className="text-gray-600">{invoiceData.customer.address}</p>
                <p className="text-gray-600">{invoiceData.customer.city}, {invoiceData.customer.country} {invoiceData.customer.postalCode}</p>
                <p className="text-gray-600">{invoiceData.customer.email}</p>
                <p className="text-gray-600">{invoiceData.customer.phone}</p>
              </div>
            </div>
            
            {/* Invoice Items */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 text-left text-gray-700">Description</th>
                    <th className="py-3 text-right text-gray-700">Rate</th>
                    <th className="py-3 text-right text-gray-700">Qty</th>
                    <th className="py-3 text-right text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-gray-700">Base Tour Rate</td>
                    <td className="py-3 text-right text-gray-700">${invoiceData.pricing.basicRate.toFixed(2)}</td>
                    <td className="py-3 text-right text-gray-700">{invoiceData.pricing.numberOfRiders}</td>
                    <td className="py-3 text-right text-gray-700">${(invoiceData.pricing.basicRate * invoiceData.pricing.numberOfRiders).toFixed(2)}</td>
                  </tr>
                  
                  {invoiceData.pricing.hotelUpgrade && (
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-700">Hotel Upgrade</td>
                      <td className="py-3 text-right text-gray-700">${invoiceData.pricing.hotelUpgradeRate.toFixed(2)}</td>
                      <td className="py-3 text-right text-gray-700">{invoiceData.pricing.numberOfRiders}</td>
                      <td className="py-3 text-right text-gray-700">${(invoiceData.pricing.hotelUpgradeRate * invoiceData.pricing.numberOfRiders).toFixed(2)}</td>
                    </tr>
                  )}
                  
                  {invoiceData.pricing.airportTransfer && (
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-700">Airport Transfer</td>
                      <td className="py-3 text-right text-gray-700">${invoiceData.pricing.airportTransferRate.toFixed(2)}</td>
                      <td className="py-3 text-right text-gray-700">1</td>
                      <td className="py-3 text-right text-gray-700">${invoiceData.pricing.airportTransferRate.toFixed(2)}</td>
                    </tr>
                  )}
                  
                  {invoiceData.pricing.bikeUpgrade && (
                    <tr className="border-b border-gray-200">
                      <td className="py-3 text-gray-700">Premium Bike Upgrade</td>
                      <td className="py-3 text-right text-gray-700">${invoiceData.pricing.bikeUpgradeRate.toFixed(2)}</td>
                      <td className="py-3 text-right text-gray-700">{invoiceData.pricing.numberOfRiders}</td>
                      <td className="py-3 text-right text-gray-700">${(invoiceData.pricing.bikeUpgradeRate * invoiceData.pricing.numberOfRiders).toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Invoice Totals */}
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Discount ({invoiceData.pricing.discountType === 'percentage' ? `${invoiceData.pricing.discount}%` : '$' + invoiceData.pricing.discount}):</span>
                  <span className="font-medium">-${calculateDiscount().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-gray-300 text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Link href="/rates-pricing" className="text-blue-600 px-6 py-2 rounded flex items-center hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back: Rates & Pricing
            </Link>
            
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-green-600 text-white px-8 py-2 rounded flex items-center hover:bg-green-700 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Generate Invoice
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 