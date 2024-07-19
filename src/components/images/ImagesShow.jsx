import { useState } from "react"
import { isAdmin, isOwner } from "../../lib/auth"
import ImageDelete from "./ImageDelete"

export default function ImagesShow({ images, setIsComplete }) {


  // * CAROUSEL LOGIC

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [deleteCheck, setDeleteCheck] = useState(false)

  const goToPreviousImageCarousal = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
    setDeleteCheck(false)
  }

  const goToNextImageCarousal = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    setDeleteCheck(false)
  }

  // * PAGINATION LOGIC 

  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 4

  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImage = images.slice(indexOfFirstImage, indexOfLastImage)

  const totalPages = Math.ceil(images.length / imagesPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }


  // * MODAL LOGIC
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalOctopus, setModalOctopus] = useState(null)

  function openImageModal(image) {
    setModalOctopus(image)
    setIsModalOpen(true)
    console.log(image)
  }

  function closeImageModal() {
    setIsModalOpen(false)
    setModalOctopus(null)
  }

  function formatDate(dateStr) {
    const dateOnly = dateStr.split('T')[0]
    const [year, month, day] = dateOnly.split('-')
    return `${day}-${month}-${year}`
  }


  return (
    <>
      <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
        {/* Carousel for small screens */}
        <div className="flex sm:hidden">
          {images && images.length > 0 && (
            <div className="carousel-item relative w-full card card-compact bg-base-100 bg-opacity-90 shadow-xl text-center">
              <figure>
                <img
                  src={images[currentImageIndex].document}
                  alt={images[currentImageIndex].title}
                />
              </figure>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={goToPreviousImageCarousal} className="btn btn-circle btn-xs">❮</button>
                <button onClick={goToNextImageCarousal} className="btn btn-circle btn-xs">❯</button>
              </div>
              <div className="card-body flex justify-center items-center">
                <p className="card-title">{images[currentImageIndex].title}</p>
                <p>Taken by: {images[currentImageIndex].image_owner.username}</p>
                <p>Added on: {formatDate(images[currentImageIndex].created_at)}</p>
                {(isAdmin() || isOwner(images[currentImageIndex].image_owner.id)) && (
                  <ImageDelete
                    setIsComplete={setIsComplete}
                    deleteCheck={deleteCheck}
                    setDeleteCheck={setDeleteCheck}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid for Larger Screens */}
      <div className="hidden sm:grid">
        <p className="mt-4 italic">Click image for more details</p>
        <div className="flex justify-between items-center mb-4">
          <button
            data-theme="nord"
            className="btn btn-outline btn-circle btn-accent mx-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          {images && (
            <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
              {currentImage.map((image) => (
                <div
                  key={image.id}
                  className="card card-compact bg-base-100 bg-opacity-90 shadow-xl w-full cursor-pointer"
                  onClick={() => openImageModal(image)}
                >
                  <figure className="">
                    <img className="h-56 2xl:h-80 w-full" src={image.document} alt={image.title} />
                  </figure>
                  <div className="card-body text-center flex items-center">
                    <p className="card-title justify-center text-sm">{image.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            data-theme="nord"
            className="btn btn-outline btn-circle btn-accent mx-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      {isModalOpen && modalOctopus && (
        <div className="modal modal-open" onClick={closeImageModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <figure>
              <img className="w-full h-auto" src={modalOctopus.document} alt={modalOctopus.title} />
            </figure>
            <h2 className="font-bold text-lg mt-5">{modalOctopus.title}</h2>
            <p>Taken by: {modalOctopus.image_owner.username}</p>
            <p>Added on: {formatDate(modalOctopus.created_at)}</p>
            {(isAdmin() || isOwner(modalOctopus.image_owner.id)) && (
              <ImageDelete
                modalOctopus={modalOctopus}
                closeImageModal={closeImageModal}
                setIsComplete={setIsComplete}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
