'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <header className="mb-8 bg-green-100 p-4 rounded-lg">
          <h1 className="text-3xl font-bold text-green-800">E-Bike Tours Dashboard</h1>
          <p className="text-green-600">Manage your invoices and customers</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Invoices" 
            count="24" 
            icon="📄" 
            color="bg-blue-100"
            link="/invoices"
          />
          <DashboardCard 
            title="Customers" 
            count="18" 
            icon="👥" 
            color="bg-green-100"
            link="/customers"
          />
          <DashboardCard 
            title="Reports" 
            count="5" 
            icon="📊" 
            color="bg-purple-100"
            link="/reports"
          />
        </div>
        
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">Today</p>
            </div>
            <ul className="divide-y divide-gray-200">
              <ActivityItem 
                action="Invoice created" 
                subject="Invoice #1234" 
                time="2 hours ago" 
              />
              <ActivityItem 
                action="Payment received" 
                subject="Invoice #1230" 
                time="5 hours ago" 
              />
              <ActivityItem 
                action="Customer added" 
                subject="Mountain Adventures" 
                time="Yesterday" 
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  count: string;
  icon: string;
  color: string;
  link: string;
}

function DashboardCard({ title, count, icon, color, link }: DashboardCardProps) {
  return (
    <a 
      href={link}
      className="block bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color} text-2xl`}>
            {icon}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <p className="text-3xl font-bold text-gray-900">{count}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

interface ActivityItemProps {
  action: string;
  subject: string;
  time: string;
}

function ActivityItem({ action, subject, time }: ActivityItemProps) {
  return (
    <li className="px-4 py-3">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-800">{action}</p>
          <p className="text-sm text-gray-600">{subject}</p>
        </div>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </li>
  );
} 