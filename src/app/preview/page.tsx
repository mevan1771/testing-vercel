'use client';

import { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import FormSection from '@/components/FormSection';
import NavButtons from '@/components/NavButtons';

export default function PreviewPage() {
  const [previewMode, setPreviewMode] = useState('invoice'); // 'invoice' or 'email'

  return (
    <PageLayout activeStep={4}>
      <div className="flex mb-4 space-x-2">
        <button
          className={`px-3 py-1.5 rounded text-sm font-medium ${previewMode === 'invoice' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setPreviewMode('invoice')}
        >
          Invoice Preview
        </button>
        <button
          className={`px-3 py-1.5 rounded text-sm font-medium ${previewMode === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setPreviewMode('email')}
        >
          Email Preview
        </button>
      </div>
      
      {previewMode === 'invoice' ? (
        <FormSection title="Invoice Preview">
          <div className="border rounded-lg p-4 bg-white shadow-inner">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1">E-Bike Tour Company</h3>
                  <p className="text-sm text-gray-600">123 Adventure Road</p>
                  <p className="text-sm text-gray-600">Bikeville, CA 90210</p>
                  <p className="text-sm text-gray-600">info@ebiketours.com</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">INVOICE</p>
                  <p className="text-sm text-gray-600">Invoice #: INV-225</p>
                  <p className="text-sm text-gray-600">Date: 05/01/2023</p>
                  <p className="text-sm text-gray-600">Due Date: 05/15/2023</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Tour Information</h4>
              <p className="text-sm mb-1"><span className="font-medium">Tour Name:</span> Tanzania E-Bike Adventure</p>
              <p className="text-sm mb-1"><span className="font-medium">Dates:</span> Apr 30, 2023 - May 5, 2023</p>
              <p className="text-sm"><span className="font-medium">Tour Leader:</span> John Smith</p>
            </div>
            
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-right">Qty</th>
                  <th className="py-2 px-3 text-right">Rate</th>
                  <th className="py-2 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3">E-Bike Rental</td>
                  <td className="py-2 px-3 text-right">5</td>
                  <td className="py-2 px-3 text-right">$50.00/day</td>
                  <td className="py-2 px-3 text-right">$250.00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Tour Guide</td>
                  <td className="py-2 px-3 text-right">1</td>
                  <td className="py-2 px-3 text-right">$200.00</td>
                  <td className="py-2 px-3 text-right">$200.00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Support Vehicle</td>
                  <td className="py-2 px-3 text-right">1</td>
                  <td className="py-2 px-3 text-right">$150.00</td>
                  <td className="py-2 px-3 text-right">$150.00</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3">Insurance</td>
                  <td className="py-2 px-3 text-right">5</td>
                  <td className="py-2 px-3 text-right">$15.00/person</td>
                  <td className="py-2 px-3 text-right">$75.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-medium">
                  <td colSpan={3} className="py-2 px-3 text-right">Subtotal:</td>
                  <td className="py-2 px-3 text-right">$675.00</td>
                </tr>
                <tr className="font-medium">
                  <td colSpan={3} className="py-2 px-3 text-right">Tax:</td>
                  <td className="py-2 px-3 text-right">$67.50</td>
                </tr>
                <tr className="font-bold text-lg">
                  <td colSpan={3} className="py-2 px-3 text-right">Total:</td>
                  <td className="py-2 px-3 text-right">$742.50</td>
                </tr>
              </tfoot>
            </table>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Payment Instructions:</p>
              <p>Please make payment to: E-Bike Tour Company</p>
              <p>Bank: Adventure Bank</p>
              <p>Account: 1234567890</p>
              <p>Due Date: 05/15/2023</p>
            </div>
          </div>
        </FormSection>
      ) : (
        <FormSection title="Email Preview">
          <div className="border rounded-lg p-4 bg-white shadow-inner">
            <div className="mb-3">
              <p className="text-sm text-gray-600"><strong>To:</strong> john.client@example.com</p>
              <p className="text-sm text-gray-600"><strong>Subject:</strong> Your E-Bike Tour Invoice #INV-225</p>
            </div>
            
            <div className="border-t pt-3">
              <p className="mb-3">Dear John,</p>
              
              <p className="mb-3">Thank you for choosing E-Bike Tour Company for your adventure. Please find attached your invoice #INV-225 for the Tanzania E-Bike Adventure tour scheduled for Apr 30, 2023 - May 5, 2023.</p>
              
              <p className="mb-3">The total amount due is <strong>$742.50</strong>, payable by May 15, 2023.</p>
              
              <p className="mb-3">If you have any questions regarding this invoice, please don't hesitate to contact us.</p>
              
              <p className="mb-3">We look forward to providing you with an unforgettable e-biking experience!</p>
              
              <p className="mb-1">Best regards,</p>
              <p className="mb-3">The E-Bike Tour Team</p>
              
              <div className="text-xs text-gray-500">
                <p>E-Bike Tour Company</p>
                <p>123 Adventure Road, Bikeville, CA 90210</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@ebiketours.com</p>
              </div>
            </div>
          </div>
        </FormSection>
      )}
      
      <div className="mt-4 flex justify-end space-x-2">
        <button className="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium">
          Download PDF
        </button>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
          Send to Client
        </button>
      </div>
      
      <NavButtons 
        backLink="/rates-pricing"
        backText="Back: Rates"
        nextLink="/"
        nextText="Finish"
        isCompact
      />
    </PageLayout>
  );
} 