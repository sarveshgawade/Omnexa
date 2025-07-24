import { useEffect, useState } from 'react'
import BaseLayout from '@/layouts/BaseLayout'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { deleteImageById, getGalleryImages, deleteAllImages, uploadGalleryImages } from '@/redux/slices/gallerySlice'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useRef } from 'react'

function GalleryPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { role, isLoggedIn } = useSelector((state: RootState) => state?.auth)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [imageId, setImageId] = useState('')
  const [allDeleteConfirmOpen, setAllDeleteConfirmOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  useEffect(() => {
    dispatch(getGalleryImages())
  }, [dispatch])

  const { gallery } = useSelector((state: RootState) => state?.gallery)

  const handleDeleteImage = async (id: string) => {
    setIsModelOpen(false)
    const response = await dispatch(deleteImageById(id))
    console.log(response?.payload)
    if (response?.payload) {
      await dispatch(getGalleryImages())
    }
  }

  const handleDeleteAllImages = async () => {
    setAllDeleteConfirmOpen(false)
    const response = await dispatch(deleteAllImages())
    console.log(response?.payload)
    if (response?.payload) {
      await dispatch(getGalleryImages())
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    setSelectedFiles(files)
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file))
      setPreviewUrls(urls)
    } else {
      setPreviewUrls([])
    }
  }

  const handleUploadImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return
    const formData = new FormData()
    Array.from(selectedFiles).forEach(file => {
      formData.append('galleryImages', file)
    })
    setAddDialogOpen(false)
    setSelectedFiles(null)
    setPreviewUrls([])
    if (fileInputRef.current) fileInputRef.current.value = ''
    const response = await dispatch(uploadGalleryImages(formData))
    if (response?.payload) {
      await dispatch(getGalleryImages())
    }
  }

  // Helper to clear file input and previews
  const clearFileSelection = () => {
    setSelectedFiles(null)
    setPreviewUrls([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <BaseLayout>
      <div className="container mx-auto py-10 px-4 mt-10 mb-10">
        {/* Delete All Images Header */}
        {isLoggedIn && role === 'ADMIN' && gallery.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setAddDialogOpen(true)}
              >
                + Add Images
              </Button>
              <Button
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setAllDeleteConfirmOpen(true)}
              >
                <FaTrash  className="w-4 h-4 " />
                Delete All Images
              </Button>
            </div>
          </div>
        )}

        {/* Gallery Grid or Empty Message */}
        {gallery && gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {gallery.map((image, idx) => (
              <div
                key={image?._id}
                className="relative rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                data-aos="fade-up"
              >
                {isLoggedIn && role === 'ADMIN' && (
                  <button
                    onClick={() => {
                      setIsModelOpen(true)
                      setImageId(image?._id || '')
                    }}
                    className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition duration-300 cursor-pointer"
                    title="Delete this image"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}

                <img
                  src={image?.secure_url}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-64 object-cover transition-all duration-700 hover:grayscale hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-xl py-20">
            No gallery images to show.
          </div>
        )}
      </div>

      {/* Delete Image Modal */}
      {isModelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
            <h2 className="text-lg font-semibold mb-4">Delete this image?</h2>
            <div className="flex justify-end gap-4">
              <Button className='cursor-pointer' variant="outline" onClick={() => setIsModelOpen(false)}>Cancel</Button>
              <Button className='cursor-pointer' onClick={() => handleDeleteImage(imageId)}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete All Images Confirm Modal */}
      {allDeleteConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 animate-in fade-in zoom-in-95">
            <h2 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete all images?
            </h2>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setAllDeleteConfirmOpen(false)}>Cancel</Button>
              <Button  onClick={handleDeleteAllImages}>Yes, Delete All</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Images Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={(open) => {
        setAddDialogOpen(open)
        if (!open) clearFileSelection()
      }}>
        <DialogContent showCloseButton>
          <DialogHeader>
            <DialogTitle>Add Gallery Images</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {previewUrls.map((url, idx) => (
                  <img key={idx} src={url} alt={`Preview ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button className='cursor-pointer' variant="outline" onClick={() => {
              setAddDialogOpen(false)
              clearFileSelection()
            }}>Cancel</Button>
            <Button className='cursor-pointer' onClick={handleUploadImages} disabled={!selectedFiles || selectedFiles.length === 0}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BaseLayout>
  )
}

export default GalleryPage
