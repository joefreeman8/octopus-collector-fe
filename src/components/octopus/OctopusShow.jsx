import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import SightingShow from "../sightings/SightingShow"
import AddSighting from "../sightings/AddSighting"
import OctopusDelete from "./OctopusDelete"
import { getSingleOctopus } from "../../lib/api"
import { isAdmin } from "../../lib/auth"
import OctopusEdit from "./OctopusEdit"


export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)
  const [sightingAdded, setSightingAdded] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSingleOctopus(id)
        setOctopusData(data)
        setSightingAdded(false)
        setIsComplete(false)

      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id, sightingAdded, isComplete])

  console.log(octopusData)

  function activateEditMode() {
    setIsEditMode(true)
  }

  return (
    <div className="h-screen">
      {octopusData && (
        <div className="mt-5">
          <Link className="mt-5 ml-5 mr-2 btn btn-accent" to={'/octopus'}>Go Back</Link>
          {isAdmin() && (
            <>
              {
                isEditMode ? (
                  <button className="btn btn-warning mr-2 btn-disabled"> Edit</button>
                ) : (
                  <button onClick={activateEditMode} className="btn btn-warning mr-2">Edit</button>
                )
              }
              <OctopusDelete id={id} octopusName={octopusData.name} />
            </>
          )}
          <div className="flex justify-center items-center mt-8">
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
              <section className="p-4 md:w-1/2">
                <div className="card bg-base-100 bg-opacity-90 mb-5 shadow-xl">
                  <div className="card-body flex items-center">
                    {isEditMode ? (
                      <OctopusEdit
                        id={id}
                        name={octopusData.name}
                        scientific_name={octopusData.scientific_name}
                        description={octopusData.description}
                        life_span={octopusData.life_span}
                        sightings={octopusData.sightings}
                        setIsComplete={setIsComplete}
                        setIsEditMode={setIsEditMode}
                      />
                    ) : (
                      <>
                        <h1 className="text-white card-title text-center w-fit">
                          {octopusData.name}
                          <span className="text-sm">
                            ({octopusData.scientific_name})
                          </span>
                        </h1>
                        <p><strong className="text-white">Bio:</strong> {octopusData.description}</p>
                        <p><strong className="text-white">Life span:</strong> {octopusData.life_span} years.</p>
                      </>
                    )}
                  </div>
                  {/* {octopusData.images.length > 0 && (
                    <img src={octopusData.images[0].document} alt={octopusData.images[0].title} />
                  )} */}
                </div>
                <div className="hidden sm:grid">
                  {octopusData.images && (
                    <div className="mt-5 sm:grid sm:grid-cols-2 sm:gap-3">
                      {octopusData.images.map((photo) => (
                        <div key={photo.id} className="card card-compact bg-base-300 shadow-xl w-full">
                          <figure className="">
                            <img className="h-56 2xl:h-80 w-full" src={photo.document} alt={photo.title} />
                          </figure>
                          <div className="card-body text-center flex items-center">
                            <p className="card-title justify-center text-sm">{photo.title}</p>
                            <p>By: {photo.image_owner.username}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
              <section className="card px-4 md:w-1/2">
                <div className="card card-body space-y-4 flex justify-center items-center md:w-full" >
                  <SightingShow
                    sightings={octopusData.sightings}
                    sightingsThisWeek={octopusData.sightings_this_week}
                    sightingsThisMonth={octopusData.sightings_this_month}
                    octopusName={octopusData.name}
                    setIsComplete={setIsComplete}
                  />
                  <AddSighting id={id} setSightingAdded={setSightingAdded} />
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
