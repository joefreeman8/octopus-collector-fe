
export default function ImagesShow({ images }) {
  return (
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
  )
}
