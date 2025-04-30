'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default function RatesPricingPage() {
  const activeStep: number = 3;
  const [ratesData, setRatesData] = useState({
    currency: 'USD (US Dollar)',
    // Bike Rental
    dailyRatePerBike: 50,
    numberOfBikes: 1,
    numberOfDays: 0,
    // Additional Services
    tourGuideRate: 200,
    supportVehicle: 150,
    equipmentRental: 30,
    // Insurance and Extras
    insuranceRatePerPerson: 15,
    // Optional Services
    airportTransfer: false,
    bikeMaintenance: false,
    gpsRental: false,
    welcomePackage: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setRatesData({
      ...ratesData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Calculate totals
  const calculateBikeRentalTotal = () => {
    return ratesData.dailyRatePerBike * ratesData.numberOfBikes * ratesData.numberOfDays;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src="/logo.png" alt="E-Bike Tour Logo" className="h-16 mr-6" />
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
                {activeStep > 2 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  '2'
                )}
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

          {/* Currency Selector */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Select Currency</h2>
              <select
                name="currency"
                className="w-64 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.currency}
                onChange={handleChange}
              >
                <option value="USD (US Dollar)">USD (US Dollar)</option>
                <option value="EUR (Euro)">EUR (Euro)</option>
                <option value="GBP (British Pound)">GBP (British Pound)</option>
                <option value="CAD (Canadian Dollar)">CAD (Canadian Dollar)</option>
                <option value="AUD (Australian Dollar)">AUD (Australian Dollar)</option>
              </select>
            </div>
          </div>

          {/* Accommodation Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Accommodation Selection</h2>
              <button className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Day
              </button>
            </div>
            <div className="text-right text-sm text-gray-600">Total Accommodation: $0.00</div>
          </div>

          {/* Transport Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-4">Transport Selection</h2>
            <div className="flex items-center mb-4">
              <div className="w-1/3">
                <span className="text-sm font-medium text-gray-700">Day 1: Wed, Apr 30</span>
              </div>
              <div className="w-2/3">
                <select
                  name="transportDay1"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select transport</option>
                  <option value="airport_pickup">Airport Pickup</option>
                  <option value="local_transfer">Local Transfer</option>
                  <option value="private_van">Private Van</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-sm hover:bg-blue-700">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Day
              </button>
            </div>
          </div>

          {/* Bike Rental Rates */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-4">Bike Rental Rates</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rate per Bike ($)</label>
                <input
                  type="number"
                  name="dailyRatePerBike"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.dailyRatePerBike}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bikes</label>
                <input
                  type="number"
                  name="numberOfBikes"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.numberOfBikes}
                  onChange={handleChange}
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
                <input
                  type="number"
                  name="numberOfDays"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.numberOfDays}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
            <div className="text-right mt-2 text-sm font-medium">
              Total Bike Rental: ${calculateBikeRentalTotal().toFixed(2)}
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-4">Additional Services</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour Guide Rate</label>
                <input
                  type="number"
                  name="tourGuideRate"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.tourGuideRate}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Vehicle</label>
                <input
                  type="number"
                  name="supportVehicle"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.supportVehicle}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Rental</label>
                <input
                  type="number"
                  name="equipmentRental"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.equipmentRental}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Insurance and Extras */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold mb-4">Insurance and Extras</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Rate per Person</label>
              <input
                type="number"
                name="insuranceRatePerPerson"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-md"
                value={ratesData.insuranceRatePerPerson}
                onChange={handleChange}
                min="0"
              />
            </div>
            
            <h3 className="text-md font-medium mb-3">Optional Services</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded flex justify-between items-center">
                <div>
                  <span className="block font-medium">Airport Transfer</span>
                  <span className="text-sm text-gray-600">$50.00</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="airportTransfer"
                    checked={ratesData.airportTransfer}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="border p-4 rounded flex justify-between items-center">
                <div>
                  <span className="block font-medium">Bike Maintenance Package</span>
                  <span className="text-sm text-gray-600">$30.00</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="bikeMaintenance"
                    checked={ratesData.bikeMaintenance}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="border p-4 rounded flex justify-between items-center">
                <div>
                  <span className="block font-medium">GPS Rental</span>
                  <span className="text-sm text-gray-600">$10.00</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="gpsRental"
                    checked={ratesData.gpsRental}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="border p-4 rounded flex justify-between items-center">
                <div>
                  <span className="block font-medium">Welcome Package</span>
                  <span className="text-sm text-gray-600">$25.00</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="welcomePackage"
                    checked={ratesData.welcomePackage}
                    onChange={handleChange}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Link href="/rider-information" className="text-blue-600 px-6 py-2 rounded flex items-center hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back: Group Details
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