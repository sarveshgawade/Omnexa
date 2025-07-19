import { useEffect, useState } from 'react'
import BaseLayout from '@/layouts/BaseLayout'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/redux/store'
import { deleteImageById, getGalleryImages, deleteAllImages } from '@/redux/slices/gallerySlice'
import { FaTrash } from 'react-icons/fa'
import { Button } from '@/components/ui/button'

function GalleryPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { role, isLoggedIn } = useSelector((state: RootState) => state?.auth)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [imageId, setImageId] = useState('')
  const [allDeleteConfirmOpen, setAllDeleteConfirmOpen] = useState(false)

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

  return (
    <BaseLayout>
      <div className="container mx-auto py-10 px-4 mt-10 mb-10">
        {/* Delete All Images Header */}
        {isLoggedIn && role === 'ADMIN' && gallery.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">Gallery</h2> */}
            <Button
              
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setAllDeleteConfirmOpen(true)}
            >
              <FaTrash  className="w-4 h-4 " />
              Delete All Images
            </Button>
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
              <Button variant="outline" onClick={() => setIsModelOpen(false)}>Cancel</Button>
              <Button onClick={() => handleDeleteImage(imageId)}>Delete</Button>
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
    </BaseLayout>
  )
}

export default GalleryPage
