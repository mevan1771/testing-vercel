'use client';

import { useState, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

// Types
interface RatesData {
  currency: string;
  // Bike Rental
  dailyRatePerBike: number;
  numberOfBikes: number;
  numberOfDays: number;
  // Additional Services
  tourGuideRate: number;
  supportVehicle: number;
  equipmentRental: number;
  // Insurance and Extras
  insuranceRatePerPerson: number;
  numberOfPeople: number;
  // Optional Services
  airportTransfer: boolean;
  airportTransferRate: number;
  bikeMaintenance: boolean;
  bikeMaintenanceRate: number;
  gpsRental: boolean;
  gpsRentalRate: number;
  welcomePackage: boolean;
  welcomePackageRate: number;
  // Transport
  transportOptions: TransportOption[];
  // Accommodation
  accommodationOptions: AccommodationOption[];
}

interface TransportOption {
  id: string;
  day: string;
  date: string;
  option: string;
  price: number;
}

interface AccommodationOption {
  id: string;
  day: string;
  date: string;
  option: string;
  price: number;
}

interface SectionProps {
  title: string;
  children: ReactNode;
  rightElement?: ReactNode;
}

interface ToggleServiceProps {
  name: string;
  price: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

// Custom hooks
const useRatesCalculator = (ratesData: RatesData) => {
  const calculateBikeRentalTotal = useCallback(() => {
    return ratesData.dailyRatePerBike * ratesData.numberOfBikes * ratesData.numberOfDays;
  }, [ratesData.dailyRatePerBike, ratesData.numberOfBikes, ratesData.numberOfDays]);

  const calculateServicesTotal = useCallback(() => {
    return ratesData.tourGuideRate + ratesData.supportVehicle + ratesData.equipmentRental;
  }, [ratesData.tourGuideRate, ratesData.supportVehicle, ratesData.equipmentRental]);

  const calculateInsuranceTotal = useCallback(() => {
    return ratesData.insuranceRatePerPerson * ratesData.numberOfPeople;
  }, [ratesData.insuranceRatePerPerson, ratesData.numberOfPeople]);

  const calculateOptionalServicesTotal = useCallback(() => {
    let total = 0;
    if (ratesData.airportTransfer) total += ratesData.airportTransferRate;
    if (ratesData.bikeMaintenance) total += ratesData.bikeMaintenanceRate;
    if (ratesData.gpsRental) total += ratesData.gpsRentalRate;
    if (ratesData.welcomePackage) total += ratesData.welcomePackageRate;
    return total;
  }, [
    ratesData.airportTransfer, ratesData.airportTransferRate,
    ratesData.bikeMaintenance, ratesData.bikeMaintenanceRate,
    ratesData.gpsRental, ratesData.gpsRentalRate,
    ratesData.welcomePackage, ratesData.welcomePackageRate
  ]);

  const calculateTransportTotal = useCallback(() => {
    return ratesData.transportOptions.reduce((total, option) => total + option.price, 0);
  }, [ratesData.transportOptions]);

  const calculateAccommodationTotal = useCallback(() => {
    return ratesData.accommodationOptions.reduce((total, option) => total + option.price, 0);
  }, [ratesData.accommodationOptions]);

  const calculateGrandTotal = useCallback(() => {
    return (
      calculateBikeRentalTotal() +
      calculateServicesTotal() +
      calculateInsuranceTotal() +
      calculateOptionalServicesTotal() +
      calculateTransportTotal() +
      calculateAccommodationTotal()
    );
  }, [
    calculateBikeRentalTotal,
    calculateServicesTotal,
    calculateInsuranceTotal,
    calculateOptionalServicesTotal,
    calculateTransportTotal,
    calculateAccommodationTotal
  ]);

  return {
    calculateBikeRentalTotal,
    calculateServicesTotal,
    calculateInsuranceTotal,
    calculateOptionalServicesTotal,
    calculateTransportTotal,
    calculateAccommodationTotal,
    calculateGrandTotal
  };
};

// Reusable UI Components
const Section = ({ title, children, rightElement }: SectionProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">{title}</h2>
      {rightElement}
    </div>
    {children}
  </div>
);

const ToggleService = ({ name, price, checked, onChange }: ToggleServiceProps) => (
  <div className="border p-4 rounded flex justify-between items-center">
    <div>
      <span className="block font-medium">{name}</span>
      <span className="text-sm text-gray-600">${price.toFixed(2)}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer" 
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

// Main Component
export default function RatesPricingPage() {
  const activeStep: number = 3;
  const [ratesData, setRatesData] = useState<RatesData>({
    currency: 'USD (US Dollar)',
    // Bike Rental
    dailyRatePerBike: 50,
    numberOfBikes: 1,
    numberOfDays: 1,
    // Additional Services
    tourGuideRate: 200,
    supportVehicle: 150,
    equipmentRental: 30,
    // Insurance and Extras
    insuranceRatePerPerson: 15,
    numberOfPeople: 1,
    // Optional Services
    airportTransfer: false,
    airportTransferRate: 50,
    bikeMaintenance: false,
    bikeMaintenanceRate: 30,
    gpsRental: false,
    gpsRentalRate: 10,
    welcomePackage: false,
    welcomePackageRate: 25,
    // Transport
    transportOptions: [
      { id: 'transport1', day: 'Day 1', date: 'Wed, Apr 30', option: '', price: 0 }
    ],
    // Accommodation
    accommodationOptions: []
  });

  const calculator = useRatesCalculator(ratesData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setRatesData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }));
  };

  const handleToggleService = (serviceName: string, checked: boolean) => {
    setRatesData(prev => ({
      ...prev,
      [serviceName]: checked
    }));
  };

  const handleTransportChange = (id: string, value: string) => {
    setRatesData(prev => ({
      ...prev,
      transportOptions: prev.transportOptions.map(option => 
        option.id === id 
          ? { ...option, option: value, price: getTransportPrice(value) } 
          : option
      )
    }));
  };

  const addTransportDay = () => {
    const newDay = ratesData.transportOptions.length + 1;
    const newDate = getNextDate(ratesData.transportOptions[ratesData.transportOptions.length - 1].date);
    
    setRatesData(prev => ({
      ...prev,
      transportOptions: [
        ...prev.transportOptions,
        { id: `transport${newDay}`, day: `Day ${newDay}`, date: newDate, option: '', price: 0 }
      ]
    }));
  };

  const addAccommodationDay = () => {
    const newDay = ratesData.accommodationOptions.length + 1;
    const date = ratesData.accommodationOptions.length === 0 
      ? 'Wed, Apr 30' 
      : getNextDate(ratesData.accommodationOptions[ratesData.accommodationOptions.length - 1].date);
    
    setRatesData(prev => ({
      ...prev,
      accommodationOptions: [
        ...prev.accommodationOptions,
        { id: `accommodation${newDay}`, day: `Day ${newDay}`, date, option: '', price: 0 }
      ]
    }));
  };

  // Helper functions
  const getTransportPrice = (option: string): number => {
    switch (option) {
      case 'airport_pickup': return 75;
      case 'local_transfer': return 40;
      case 'private_van': return 120;
      default: return 0;
    }
  };

  const getNextDate = (currentDate: string): string => {
    // This is a simple mock function; in a real app you'd use a proper date library
    return 'Thu, May 1';
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
          <Section title="Select Currency">
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
          </Section>

          {/* Accommodation Selection */}
          <Section 
            title="Accommodation Selection" 
            rightElement={
              <button 
                onClick={addAccommodationDay}
                className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-sm hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Day
              </button>
            }
          >
            {ratesData.accommodationOptions.length > 0 ? (
              <div className="space-y-3">
                {ratesData.accommodationOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <span className="text-sm font-medium text-gray-700">{option.day}: {option.date}</span>
                    </div>
                    <div className="w-2/3">
                      <select
                        name={`accommodation-${option.id}`}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={option.option}
                      >
                        <option value="">Select accommodation</option>
                        <option value="standard_hotel">Standard Hotel ($80)</option>
                        <option value="premium_hotel">Premium Hotel ($120)</option>
                        <option value="luxury_hotel">Luxury Hotel ($200)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No accommodation days added yet. Click "Add Day" to begin.</p>
            )}
            <div className="text-right text-sm text-gray-600 mt-3">
              Total Accommodation: ${calculator.calculateAccommodationTotal().toFixed(2)}
            </div>
          </Section>

          {/* Transport Selection */}
          <Section
            title="Transport Selection"
            rightElement={
              <button 
                onClick={addTransportDay}
                className="bg-blue-600 text-white px-3 py-2 rounded flex items-center text-sm hover:bg-blue-700"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Day
              </button>
            }
          >
            <div className="space-y-3">
              {ratesData.transportOptions.map(option => (
                <div key={option.id} className="flex items-center">
                  <div className="w-1/3">
                    <span className="text-sm font-medium text-gray-700">{option.day}: {option.date}</span>
                  </div>
                  <div className="w-2/3">
                    <select
                      name={`transport-${option.id}`}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={option.option}
                      onChange={(e) => handleTransportChange(option.id, e.target.value)}
                    >
                      <option value="">Select transport</option>
                      <option value="airport_pickup">Airport Pickup ($75)</option>
                      <option value="local_transfer">Local Transfer ($40)</option>
                      <option value="private_van">Private Van ($120)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right text-sm text-gray-600 mt-3">
              Total Transport: ${calculator.calculateTransportTotal().toFixed(2)}
            </div>
          </Section>

          {/* Bike Rental Rates */}
          <Section title="Bike Rental Rates">
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
                  min="1"
                />
              </div>
            </div>
            <div className="text-right mt-2 text-sm font-medium">
              Total Bike Rental: ${calculator.calculateBikeRentalTotal().toFixed(2)}
            </div>
          </Section>

          {/* Additional Services */}
          <Section title="Additional Services">
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
            <div className="text-right mt-2 text-sm font-medium">
              Total Additional Services: ${calculator.calculateServicesTotal().toFixed(2)}
            </div>
          </Section>

          {/* Insurance and Extras */}
          <Section title="Insurance and Extras">
            <div className="mb-4 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Rate per Person</label>
                <input
                  type="number"
                  name="insuranceRatePerPerson"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.insuranceRatePerPerson}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                <input
                  type="number"
                  name="numberOfPeople"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={ratesData.numberOfPeople}
                  onChange={handleChange}
                  min="1"
                />
              </div>
            </div>
            <div className="text-right mb-4 text-sm font-medium">
              Total Insurance: ${calculator.calculateInsuranceTotal().toFixed(2)}
            </div>
            
            <h3 className="text-md font-medium mb-3">Optional Services</h3>
            <div className="grid grid-cols-2 gap-4">
              <ToggleService
                name="Airport Transfer"
                price={ratesData.airportTransferRate}
                checked={ratesData.airportTransfer}
                onChange={(checked) => handleToggleService('airportTransfer', checked)}
              />
              
              <ToggleService
                name="Bike Maintenance Package"
                price={ratesData.bikeMaintenanceRate}
                checked={ratesData.bikeMaintenance}
                onChange={(checked) => handleToggleService('bikeMaintenance', checked)}
              />
              
              <ToggleService
                name="GPS Rental"
                price={ratesData.gpsRentalRate}
                checked={ratesData.gpsRental}
                onChange={(checked) => handleToggleService('gpsRental', checked)}
              />
              
              <ToggleService
                name="Welcome Package"
                price={ratesData.welcomePackageRate}
                checked={ratesData.welcomePackage}
                onChange={(checked) => handleToggleService('welcomePackage', checked)}
              />
            </div>
            <div className="text-right mt-3 text-sm font-medium">
              Total Optional Services: ${calculator.calculateOptionalServicesTotal().toFixed(2)}
            </div>
          </Section>

          {/* Grand Total Section */}
          <Section title="Invoice Summary">
            <div className="space-y-2 border-b pb-3 mb-3">
              <div className="flex justify-between">
                <span>Bike Rental:</span>
                <span>${calculator.calculateBikeRentalTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional Services:</span>
                <span>${calculator.calculateServicesTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Insurance:</span>
                <span>${calculator.calculateInsuranceTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Optional Services:</span>
                <span>${calculator.calculateOptionalServicesTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Transport:</span>
                <span>${calculator.calculateTransportTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Accommodation:</span>
                <span>${calculator.calculateAccommodationTotal().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Grand Total:</span>
              <span>${calculator.calculateGrandTotal().toFixed(2)}</span>
            </div>
          </Section>

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