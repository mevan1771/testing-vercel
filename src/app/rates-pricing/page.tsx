'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function RatesPricingPage() {
  const activeStep: number = 3;
  const [ratesData, setRatesData] = useState({
    basicRate: 1200,
    numberOfRiders: 1,
    hotelUpgrade: false,
    hotelUpgradeRate: 300,
    airportTransfer: false,
    airportTransferRate: 75,
    bikeUpgrade: false,
    bikeUpgradeRate: 150,
    discount: 0,
    discountType: 'percentage' // 'percentage' or 'fixed'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRatesData({
      ...ratesData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRatesData({
      ...ratesData,
      [name]: value
    });
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = ratesData.basicRate * ratesData.numberOfRiders;
    
    if (ratesData.hotelUpgrade) {
      subtotal += ratesData.hotelUpgradeRate * ratesData.numberOfRiders;
    }
    
    if (ratesData.airportTransfer) {
      subtotal += ratesData.airportTransferRate;
    }
    
    if (ratesData.bikeUpgrade) {
      subtotal += ratesData.bikeUpgradeRate * ratesData.numberOfRiders;
    }
    
    return subtotal;
  };

  // Calculate discount
  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (ratesData.discountType === 'percentage') {
      return (subtotal * Number(ratesData.discount)) / 100;
    } else {
      return Number(ratesData.discount);
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
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
                {activeStep > 2 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '2'
                )}
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

          {/* Rates & Pricing Form */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Rates & Pricing</h2>
            
            <div className="grid grid-cols-2 gap-10">
              {/* Left Column - Tour Rates */}
              <div>
                <h3 className="text-md font-medium mb-4">Tour Options</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Rate (per rider)</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l">$</span>
                    <input
                      type="number"
                      name="basicRate"
                      className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={ratesData.basicRate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Riders</label>
                  <input
                    type="number"
                    name="numberOfRiders"
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ratesData.numberOfRiders}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hotelUpgrade"
                      name="hotelUpgrade"
                      checked={ratesData.hotelUpgrade}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="hotelUpgrade" className="ml-2 block text-sm font-medium text-gray-700">Hotel Upgrade</label>
                  </div>
                  {ratesData.hotelUpgrade && (
                    <div className="flex ml-6">
                      <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l">$</span>
                      <input
                        type="number"
                        name="hotelUpgradeRate"
                        className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ratesData.hotelUpgradeRate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="airportTransfer"
                      name="airportTransfer"
                      checked={ratesData.airportTransfer}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="airportTransfer" className="ml-2 block text-sm font-medium text-gray-700">Airport Transfer</label>
                  </div>
                  {ratesData.airportTransfer && (
                    <div className="flex ml-6">
                      <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l">$</span>
                      <input
                        type="number"
                        name="airportTransferRate"
                        className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ratesData.airportTransferRate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="bikeUpgrade"
                      name="bikeUpgrade"
                      checked={ratesData.bikeUpgrade}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bikeUpgrade" className="ml-2 block text-sm font-medium text-gray-700">Premium Bike Upgrade</label>
                  </div>
                  {ratesData.bikeUpgrade && (
                    <div className="flex ml-6">
                      <span className="inline-flex items-center px-3 bg-gray-100 text-gray-500 border border-r-0 border-gray-300 rounded-l">$</span>
                      <input
                        type="number"
                        name="bikeUpgradeRate"
                        className="w-full p-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ratesData.bikeUpgradeRate}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Column - Totals & Discount */}
              <div>
                <h3 className="text-md font-medium mb-4">Summary</h3>
                
                {/* Subtotal */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Discount */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Discount:</label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        name="discount"
                        min="0"
                        className="w-20 p-1 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ratesData.discount}
                        onChange={handleChange}
                      />
                      <select 
                        name="discountType"
                        value={ratesData.discountType}
                        onChange={handleSelectChange}
                        className="p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="percentage">%</option>
                        <option value="fixed">$</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Discount amount:</span>
                    <span>${calculateDiscount().toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="mt-8 pt-4 border-t border-gray-300">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Link href="/rider-information" className="text-blue-600 px-6 py-2 rounded flex items-center hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back: Rider Information
            </Link>
            
            <Link href="/preview" className="bg-blue-600 text-white px-6 py-2 rounded flex items-center hover:bg-blue-700 transition-colors">
              Next: Preview
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