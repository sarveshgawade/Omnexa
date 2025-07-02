import { Card, CardContent } from "@/components/ui/card"
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import type { Product } from '@/types/product.types'

interface productCardProps{
    product : Product
}

function ProductCard({product}: productCardProps) {

    const navigate = useNavigate()

  return (
    <Card
        className="w-[300px] h-[500px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col p-0"
        key={product._id}
    >
        
        <div className="w-full h-64 overflow-hidden">
            <img
            src={product?.productThumbnail?.secure_url}
            alt={product?.productName}
            className="w-full h-full object-cover"
            />
        </div>

       
        <CardContent className="p-6 flex flex-col flex-1 justify-between">
            <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
                {product?.productName}
            </h3>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
                {product.keyFeatures.slice(0, 2).map((feature: string, index: number) => (
                <li key={index}>• {feature}</li>
                ))}
            </ul>
            </div>

            <Button
              className="bg-green-700 hover:bg-green-800 w-full cursor-pointer"
              onClick={() => navigate("/products/description", { state: product._id })}
            >
              Learn More
            </Button>

        </CardContent>
    </Card>
  )
}

export default ProductCard
