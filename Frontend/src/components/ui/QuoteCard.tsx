"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Building, Package, Scale, User } from "lucide-react"

interface QuoteCardCompactProps {
  quotedByUsername: string
  companyName: string
  productName: string
  productQty: number
  onDelete: () => void
}

// Alternative compact version for smaller screens
export default function QuoteCard({
  quotedByUsername,
  companyName,
  productName,
  productQty,
  onDelete,
}: QuoteCardCompactProps) {
  return (
    <Card className="w-full bg-white border border-gray-200 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Main Content */}
          <div className="flex-1 space-y-3">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">{quotedByUsername}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 truncate max-w-[150px]">{companyName}</span>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 truncate max-w-[200px]">{productName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">{productQty}</span>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
