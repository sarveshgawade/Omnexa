import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
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
// import { updateProduct } from '@/redux/slices/productSlice' // Uncomment and implement this action
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getProduct, updateProduct } from '@/redux/slices/productSlice'

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

function EditProduct() {
  const [form, setForm] = useState(initialState)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { id } = useLocation().state

  // Fetch product data and prefill form (pseudo-code)
  useEffect(() => {
    async function fetchProduct() {
      const response = await dispatch(getProduct(id))// fetch by id
      // console.log(response?.payload)
      setForm({ ...initialState, ...response?.payload })
    }
    fetchProduct()
  }, [])

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

  function getFormData() {
    const formData = new FormData()
    // Only append fields that are non-empty/non-default
    Object.entries(form).forEach(([key, value]) => {
      if (
        value === '' ||
        value === null ||
        (Array.isArray(value) && value.length === 1 && value[0] === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return
      }
      if (key === 'productThumbnail' && value) {
        formData.append('productThumbnail', value as File)
      } else if (key === 'productImages' && Array.isArray(value) && value.length > 0) {
        (value as File[]).forEach(file => formData.append('productImages', file))
      } else if (Array.isArray(value)) {
        value.forEach(item => {
          if (item !== '') formData.append(key, item)
        })
      } else if (typeof value === 'boolean') {
        formData.append(key, String(value))
      } else {
        formData.append(key, value as string)
      }
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
    const response = await dispatch(updateProduct(formData))
    if (response?.payload?.success) {
      navigate('/products')
    }
  }

  // ...inputClass, cardClass, labelClass as in AddProduct...

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
            Edit Product
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {/* --- All form fields, array fields, file fields, checkboxes, etc. --- */}
            {/* Copy the JSX for all fields from AddProduct, but change button text to "Update Product" */}
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
                // required  <-- remove for edit if not mandatory
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
                // required
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
                // required
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
                      // required
                      placeholder="E.g., Iron, Calcium"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleRemoveArrayItem('nutrientContent', idx)}
                      disabled={form.nutrientContent.length === 1}
                    >
                      <Minus size={16} />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
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
                    // required
                    placeholder="E.g., Rich in flavor"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveArrayItem('keyFeatures', idx)}
                    disabled={form.keyFeatures.length === 1}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
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
                    // required
                    placeholder="E.g., Cooking, Baking"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveArrayItem('applications', idx)}
                    disabled={form.applications.length === 1}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
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
                // required
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
                // required
              />
            </div>

            <div>
              <Button type="submit" className="w-full bg-neutral-800 text-white hover:bg-neutral-700">
                Update Product
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </BaseLayout>
  )
}

export default EditProduct
