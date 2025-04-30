'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import FormSection from '@/components/FormSection';
import NavButtons from '@/components/NavButtons';

export default function GroupDetailsPage() {
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
    <PageLayout activeStep={2}>
      <FormSection title="Group Size & Accommodation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
      </FormSection>

      <FormSection title="Tour Leader Information">
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
      </FormSection>

      <NavButtons 
        backLink="/new-invoice"
        backText="Back to Tour Details"
        nextLink="/rates-pricing"
        nextText="Next: Rates"
      />
    </PageLayout>
  );
} 