import BaseLayout from '@/layouts/BaseLayout'
import type { QuoteDescription } from '@/types/quote.types'
import { PACKAGING_TYPES } from '@/types/quote.types'
import React from 'react'
import { useLocation } from 'react-router-dom'

function QuoteDescriptionPage() {
  const { quote } = useLocation().state
  const quoteDescription: QuoteDescription = quote

  // Helper to get packaging label
  const getPackagingLabel = (value: string) => {
    const found = PACKAGING_TYPES.find((p) => p.value === value)
    return found ? found.label : value
  }

  // Render fields in a specific order and with user-friendly labels
  const fields: { label: string; value: React.ReactNode }[] = [
    { label: 'Product Name', value: quoteDescription.productId?.productName },
    { label: 'Product Type', value: quoteDescription.productId?.productType },
    { label: 'Required Quantity', value: quoteDescription.requiredQty },
    { label: 'Quantity Type', value: quoteDescription.productId?.productQuantityType },
    { label: 'Contact Person', value: quoteDescription.contactPersonName },
    { label: 'Company Name', value: quoteDescription.companyName },
    { label: 'Company Email', value: quoteDescription.companyEmail },
    { label: 'Mobile Number', value: quoteDescription.mobileNumber },
    { label: 'Address', value: quoteDescription.address },
    { label: 'Country', value: quoteDescription.country },
    { label: 'Additional Info', value: quoteDescription.additionalInfo || '-' },
    { label: 'Heard From', value: quoteDescription.heardFrom },
    { label: 'Is Urgent', value: quoteDescription.isUrgent ? 'Yes' : 'No' },
    { label: 'Custom Packaging Required', value: quoteDescription.isCustomPackagingRequired ? 'Yes' : 'No' },
    { label: 'Delivery Location', value: quoteDescription.deliveryLocation },
    { label: 'Packaging Type', value: getPackagingLabel(quoteDescription.packagingType) },
    { label: 'Quoted By Email', value: quoteDescription.quotedByEmail },
    { label: 'Created At', value: new Date(quoteDescription.createdAt).toLocaleString() },
  ]

  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center py-12 min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-6">Quote Description</h1>
        <div className="w-full max-w-xl">
          <table className="w-full border border-gray-300 rounded shadow bg-white">
            <tbody>
              {fields.map(({ label, value }) => (
                <tr key={label} className="border-b last:border-b-0">
                  <td className="px-4 py-2 font-semibold capitalize border-r">{label}</td>
                  <td className="px-4 py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BaseLayout>
  )
}

export default QuoteDescriptionPage
