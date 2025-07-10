import { Card, CardContent } from "@/components/ui/card"
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import type { Product } from '@/types/product.types'
import  { deleteProduct, getAllProducts } from "@/redux/slices/productSlice"
import { useState } from "react"

interface productCardProps{
    product : Product
}

function ProductCard({product}: productCardProps) {
    const navigate = useNavigate()
    const {isLoggedIn,role} = useSelector((state:RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const [isModelOpen, setIsModelOpen] = useState(false)
    
    const handleDelete = async (productId:string) => {
        setIsModelOpen(false)

        const response = await dispatch(deleteProduct(productId))

        if (response?.payload?.success){
           await dispatch(getAllProducts())
        }
       
    }

    return (
        <Card
            className="w-[300px] h-[500px] overflow-hidden hover:shadow-xl transition-shadow flex flex-col p-0"
            key={product._id}
        >
            <div className="w-full h-64 overflow-hidden relative">
                <img
                    src={product?.productThumbnail?.secure_url}
                    alt={product?.productName}
                    className="w-full h-full object-cover"
                />
                {isLoggedIn && role === 'ADMIN' && (
                    <div className="absolute top-2 right-2 flex gap-2 " >
                        <Button
                            size="icon"
                            variant="outline"
                            className="p-2"
                            onClick={()=> navigate('/edit-product')}
                            title="Edit"
                            
                        >
                            ✏️
                        </Button>
                        <Button
                            size="icon"
                            variant="outline"
                            className="p-2"
                            onClick={()=>setIsModelOpen(true)}
                            title="Delete"
                        >
                            🗑️
                        </Button>
                    </div>
                )}
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

{/* delete product model popup */}
            {
          isModelOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
              <h2 className="text-lg font-semibold mb-4">Do you want to delete this product?</h2>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={()=> setIsModelOpen(false)}>
                  Cancel
                </Button>
                <Button className="cursor-pointer " onClick={()=>  handleDelete(product?._id || '') }>Delete </Button>
                
              </div>
            </div>
          </div>
          )
        }
        </Card>
    )
}

export default ProductCard
