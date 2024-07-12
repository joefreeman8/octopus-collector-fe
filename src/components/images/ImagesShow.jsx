import { useState } from "react"

export default function ImagesShow({ images }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1))
  }

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }
  return (
    <>
      <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
        {/* Carousel for small screens */}
        <div className="flex sm:hidden ">
          {images && images.length > 0 && (
            <div className="carousel-item relative w-full card card-compact bg-base-300 shadow-xl text-center">
              <figure>
                <img src={images[currentImageIndex].document} alt={images[currentImageIndex].title} />
              </figure>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button onClick={goToPreviousImage} className="btn btn-circle btn-xs">❮</button>
                <button onClick={goToNextImage} className="btn btn-circle btn-xs">❯</button>
              </div>
              <div className="card-body flex justify-center items-center">
                <p className="card-title">{images[currentImageIndex].title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Grid for Larger Screens */}
      <div className="hidden sm:grid">
        {images && (
          <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
            {images.map((image) => (
              <div key={image.id} className="card card-compact bg-base-300 shadow-xl w-full">
                <figure className="">
                  <img className="h-56 2xl:h-80 w-full" src={image.document} alt={image.title} />
                </figure>
                <div className="card-body text-center flex items-center">
                  <p className="card-title justify-center text-sm">{image.title}</p>
                  <p>By: {image.image_owner.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
