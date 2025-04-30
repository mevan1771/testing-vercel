'use client';

import { useState, useCallback } from 'react';
import PageLayout from '@/components/PageLayout';
import FormSection from '@/components/FormSection';
import NavButtons from '@/components/NavButtons';

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

// ToggleService Component
const ToggleService = ({ name, price, checked, onChange }: { 
  name: string; 
  price: number; 
  checked: boolean; 
  onChange: (checked: boolean) => void; 
}) => (
  <div className="border p-3 rounded flex justify-between items-center">
    <div>
      <span className="block text-sm font-medium">{name}</span>
      <span className="text-xs text-gray-600">${price.toFixed(2)}</span>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer" 
      />
      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

// Calculator hook
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

// Main Component
export default function RatesPricingPage() {
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
    const newDate = getNextDate();
    
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
      : getNextDate();
    
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

  const getNextDate = (): string => {
    return 'Thu, May 1';
  };

  return (
    <PageLayout activeStep={3}>
      {/* Currency Selector */}
      <FormSection title="Select Currency" isCompact>
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
      </FormSection>

      {/* Bike Rental Rates */}
      <FormSection title="Bike Rental Rates">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      </FormSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Transport Selection */}
        <FormSection
          title="Transport Selection"
          rightElement={
            <button 
              onClick={addTransportDay}
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center text-xs hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Day
            </button>
          }
        >
          <div className="space-y-2">
            {ratesData.transportOptions.map(option => (
              <div key={option.id} className="flex items-center text-sm">
                <div className="w-1/3">
                  <span className="text-xs font-medium text-gray-700">{option.day}: {option.date}</span>
                </div>
                <div className="w-2/3">
                  <select
                    name={`transport-${option.id}`}
                    className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="text-right text-xs text-gray-600 mt-2">
            Total Transport: ${calculator.calculateTransportTotal().toFixed(2)}
          </div>
        </FormSection>

        {/* Accommodation Selection */}
        <FormSection 
          title="Accommodation Selection" 
          rightElement={
            <button 
              onClick={addAccommodationDay}
              className="bg-blue-600 text-white px-2 py-1 rounded flex items-center text-xs hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Day
            </button>
          }
        >
          {ratesData.accommodationOptions.length > 0 ? (
            <div className="space-y-2">
              {ratesData.accommodationOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2 text-sm">
                  <div className="w-1/3">
                    <span className="text-xs font-medium text-gray-700">{option.day}: {option.date}</span>
                  </div>
                  <div className="w-2/3">
                    <select
                      name={`accommodation-${option.id}`}
                      className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <p className="text-gray-500 italic text-xs">No accommodation days added yet. Click &quot;Add Day&quot; to begin.</p>
          )}
          <div className="text-right text-xs text-gray-600 mt-2">
            Total Accommodation: ${calculator.calculateAccommodationTotal().toFixed(2)}
          </div>
        </FormSection>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Additional Services */}
        <FormSection title="Additional Services">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tour Guide Rate</label>
              <input
                type="number"
                name="tourGuideRate"
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.tourGuideRate}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Support Vehicle</label>
              <input
                type="number"
                name="supportVehicle"
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.supportVehicle}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Equipment Rental</label>
              <input
                type="number"
                name="equipmentRental"
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.equipmentRental}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div className="text-right mt-2 text-sm font-medium">
            Total Additional Services: ${calculator.calculateServicesTotal().toFixed(2)}
          </div>
        </FormSection>

        {/* Insurance and Extras */}
        <FormSection title="Insurance and Extras">
          <div className="mb-2 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Insurance Rate/Person</label>
              <input
                type="number"
                name="insuranceRatePerPerson"
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.insuranceRatePerPerson}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Number of People</label>
              <input
                type="number"
                name="numberOfPeople"
                className="w-full p-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ratesData.numberOfPeople}
                onChange={handleChange}
                min="1"
              />
            </div>
          </div>
          <div className="text-right mb-2 text-xs font-medium">
            Total Insurance: ${calculator.calculateInsuranceTotal().toFixed(2)}
          </div>
        </FormSection>
      </div>

      {/* Optional Services */}
      <FormSection title="Optional Services">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <ToggleService
            name="Airport Transfer"
            price={ratesData.airportTransferRate}
            checked={ratesData.airportTransfer}
            onChange={(checked) => handleToggleService('airportTransfer', checked)}
          />
          
          <ToggleService
            name="Bike Maintenance"
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
        <div className="text-right mt-2 text-sm font-medium">
          Total Optional Services: ${calculator.calculateOptionalServicesTotal().toFixed(2)}
        </div>
      </FormSection>

      {/* Invoice Summary */}
      <FormSection title="Invoice Summary">
        <div className="space-y-1 border-b pb-2 mb-2 text-sm">
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
        <div className="flex justify-between text-base font-bold">
          <span>Grand Total:</span>
          <span>${calculator.calculateGrandTotal().toFixed(2)}</span>
        </div>
      </FormSection>

      <NavButtons 
        backLink="/rider-information"
        backText="Back: Group Details"
        nextLink="/preview"
        nextText="Next: Preview"
        isCompact
      />
    </PageLayout>
  );
} 