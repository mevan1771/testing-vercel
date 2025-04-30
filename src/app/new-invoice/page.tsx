'use client';

import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PageLayout from '@/components/PageLayout';
import FormSection from '@/components/FormSection';
import NavButtons from '@/components/NavButtons';

export default function NewInvoicePage() {
  const [invoiceData, setInvoiceData] = useState({
    tourName: '',
    invoiceNumber: 'INV-225',
    startDate: null as Date | null,
    endDate: null as Date | null,
    invoiceDate: new Date() // Set default to today
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value
    });
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setInvoiceData({
      ...invoiceData,
      [fieldName]: date
    });
  };

  // Custom input component for the DatePicker
  const CustomInput = forwardRef<HTMLInputElement, { value?: string; onClick?: () => void; placeholder?: string }>(
    ({ value, onClick, placeholder }, ref) => (
      <input
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={onClick}
        value={value}
        ref={ref}
        readOnly
        placeholder={placeholder}
      />
    )
  );
  
  CustomInput.displayName = 'CustomInput';

  return (
    <PageLayout activeStep={1}>
      <FormSection title="Tour Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <DatePicker 
              selected={invoiceData.startDate}
              onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              customInput={<CustomInput placeholder="dd/mm/yyyy" />}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <DatePicker 
              selected={invoiceData.endDate}
              onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={invoiceData.startDate || undefined}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              customInput={<CustomInput placeholder="dd/mm/yyyy" />}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
            <DatePicker 
              selected={invoiceData.invoiceDate}
              onChange={(date: Date | null) => handleDateChange(date, 'invoiceDate')}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              customInput={<CustomInput />}
            />
          </div>
        </div>
      </FormSection>

      <NavButtons 
        backLink="/"
        backText="Cancel"
        nextLink="/rider-information"
        nextText="Next: Group Details"
      />
    </PageLayout>
  );
} 