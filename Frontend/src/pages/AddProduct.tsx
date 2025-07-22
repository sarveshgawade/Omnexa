import React, { useState, ChangeEvent, FormEvent } from 'react'
import BaseLayout from '@/layouts/BaseLayout'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Minus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/redux/store'
import { addProduct } from '@/redux/slices/productSlice'
import { useNavigate } from 'react-router-dom'

const initialState = {
  productName: '',
  productType: 'AGRO',
  productQuantityType: 'NOS',
  productForm: '',
  productDescription: '',
  nutrientContent: [''],
  isOrganic: false,
  keyFeatures: [''],
  applications: [''],
  isPremium: false,
  productShelfLife: '',
  productThumbnail: null as File | null,
  productImages: [] as File[],
}

function AddProduct() {
  const [form, setForm] = useState(initialState)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleArrayChange = (name: string, idx: number, value: string) => {
    const arr = [...(form as any)[name]]
    arr[idx] = value
    setForm(prev => ({ ...prev, [name]: arr }))
  }

  const handleAddArrayItem = (name: string) => {
    setForm(prev => ({
      ...prev,
      [name]: [...(form as any)[name], ''],
    }))
  }

  const handleRemoveArrayItem = (name: string, idx: number) => {
    const arr = [...(form as any)[name]]
    arr.splice(idx, 1)
    setForm(prev => ({
      ...prev,
      [name]: arr,
    }))
  }

  function getFormData(){
    const formData = new FormData()

    // Simple fields
    formData.append('productName', form.productName)
    formData.append('productType', form.productType)
    formData.append('productQuantityType', form.productQuantityType)
    formData.append('productForm', form.productForm)
    formData.append('productDescription', form.productDescription)
    formData.append('isOrganic', String(form.isOrganic))
    formData.append('isPremium', String(form.isPremium))
    formData.append('productShelfLife', form.productShelfLife)

    // Arrays
    form.nutrientContent.forEach((item) =>
      formData.append('nutrientContent', item)
    )
    form.keyFeatures.forEach((item) =>
      formData.append('keyFeatures', item)
    )
    form.applications.forEach((item) =>
      formData.append('applications', item)
    )

    // Files
    if (form.productThumbnail) {
      formData.append('productThumbnail', form.productThumbnail)
    }
    form.productImages.forEach((file) => {
      formData.append('productImages', file)
    })

    return formData
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files?.length) return

    if (name === 'productThumbnail') {
      setForm(prev => ({ ...prev, productThumbnail: files[0] }))
    } else if (name === 'productImages') {
      setForm(prev => ({
        ...prev,
        productImages: Array.from(files),
      }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const formData = getFormData()

    setForm(initialState)

    const response = await dispatch(addProduct(formData))
    if(response?.payload?.success){
      navigate('/products')
    }
  }      

  const inputClass =
    'bg-white text-neutral-800 border border-gray-300 focus:border-gray-500 focus:ring-1 focus:ring-gray-400'

  const cardClass =
    'bg-white border border-gray-200 rounded-lg shadow-sm'

  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <BaseLayout>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto px-4 py-10 md:p-8"
      >
        <Card className={`${cardClass} p-6 md:p-10`}>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Add New Product
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="productName" className={labelClass}>
                Product Name*
              </label>
              <Input
                id="productName"
                name="productName"
                className={inputClass}
                placeholder="E.g., Jaggery Cube"
                value={form.productName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="productType" className={labelClass}>
                Product Type*
              </label>
              <Select
                value={form.productType}
                onValueChange={v => handleSelectChange('productType', v)}
              >
                <SelectTrigger className={inputClass} id="productType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AGRO">AGRO</SelectItem>
                  <SelectItem value="NONAGRO">NONAGRO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="productQuantityType" className={labelClass}>
                Product Quantity Type*
              </label>
              <Select
                value={form.productQuantityType}
                onValueChange={v => handleSelectChange('productQuantityType', v)}
              >
                <SelectTrigger className={inputClass} id="productQuantityType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KG">KG</SelectItem>
                  <SelectItem value="LTR">LTR</SelectItem>
                  <SelectItem value="NOS">NOS</SelectItem>
                  <SelectItem value="TONS">TONS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="productForm" className={labelClass}>
                Product Form*
              </label>
              <Input
                id="productForm"
                name="productForm"
                className={inputClass}
                placeholder="E.g., Powder, Cube"
                value={form.productForm}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="productDescription" className={labelClass}>
                Product Description*
              </label>
              <Textarea
                id="productDescription"
                name="productDescription"
                className={inputClass}
                placeholder="Detailed product description..."
                value={form.productDescription}
                onChange={handleChange}
                required
              />
            </div>

            {/* Nutrient Content */}
            {form.productType === 'AGRO' && (
              <div>
                <label className={labelClass}>Nutrient Content*</label>
                {form.nutrientContent.map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <Input
                      className={inputClass + ' flex-1'}
                      value={item}
                      onChange={e =>
                        handleArrayChange('nutrientContent', idx, e.target.value)
                      }
                      required
                      placeholder="E.g., Iron, Calcium"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className='cursor-pointer'
                      onClick={() => handleRemoveArrayItem('nutrientContent', idx)}
                      disabled={form.nutrientContent.length === 1}
                    >
                      <Minus size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  className='cursor-pointer'
                  onClick={() => handleAddArrayItem('nutrientContent')}
                >
                  <Plus size={16} className="mr-2" />
                  Add Nutrient
                </Button>
              </div>
            )}

            {/* Boolean Flags */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="isOrganic"
                checked={form.isOrganic}
                onCheckedChange={checked =>
                  setForm(prev => ({ ...prev, isOrganic: !!checked }))
                }
              />
              <label htmlFor="isOrganic" className="text-sm font-medium">
                Is Organic
              </label>
            </div>

            {/* Key Features */}
            <div>
              <label className={labelClass}>Key Features*</label>
              {form.keyFeatures.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    className={inputClass + ' flex-1'}
                    value={item}
                    onChange={e =>
                      handleArrayChange('keyFeatures', idx, e.target.value)
                    }
                    required
                    placeholder="E.g., Rich in flavor"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className='cursor-pointer'
                    onClick={() => handleRemoveArrayItem('keyFeatures', idx)}
                    disabled={form.keyFeatures.length === 1}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className='cursor-pointer'
                onClick={() => handleAddArrayItem('keyFeatures')}
              >
                <Plus size={16} className="mr-2" />
                Add Feature
              </Button>
            </div>

            {/* Applications */}
            <div>
              <label className={labelClass}>Applications*</label>
              {form.applications.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    className={inputClass + ' flex-1'}
                    value={item}
                    onChange={e =>
                      handleArrayChange('applications', idx, e.target.value)
                    }
                    required
                    placeholder="E.g., Cooking, Baking"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className='cursor-pointer'
                    onClick={() => handleRemoveArrayItem('applications', idx)}
                    disabled={form.applications.length === 1}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                className='cursor-pointer'
                onClick={() => handleAddArrayItem('applications')}
              >
                <Plus size={16} className="mr-2" />
                Add Application
              </Button>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label htmlFor="productThumbnail" className={labelClass}>
                Product Thumbnail*
              </label>
              <Input
                type="file"
                name="productThumbnail"
                id="productThumbnail"
                className={inputClass}
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            {/* Product Images */}
            <div>
              <label htmlFor="productImages" className={labelClass}>
                Product Images
              </label>
              <Input
                type="file"
                name="productImages"
                id="productImages"
                multiple
                accept="image/*"
                className={inputClass}
                onChange={handleFileChange}
              />
            </div>

            {/* Premium Boolean */}
            <div className="flex items-center space-x-3">
              <Checkbox
                id="isPremium"
                checked={form.isPremium}
                onCheckedChange={checked =>
                  setForm(prev => ({ ...prev, isPremium: !!checked }))
                }
              />
              <label htmlFor="isPremium" className="text-sm font-medium">
                Is Premium
              </label>
            </div>

            {/* Shelf Life */}
            <div>
              <label htmlFor="productShelfLife" className={labelClass}>
                Shelf Life (Months)*
              </label>
              <Input
                id="productShelfLife"
                name="productShelfLife"
                type="number"
                min={1}
                className={inputClass}
                placeholder="E.g., 6"
                value={form.productShelfLife}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Button type="submit" className="cursor-pointer w-full bg-neutral-800 text-white hover:bg-neutral-700">
                Add Product
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </BaseLayout>
  )
}

export default AddProduct
