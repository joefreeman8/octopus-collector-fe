import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import SightingShow from "../sightings/SightingShow"
import AddSighting from "../sightings/AddSighting"
import OctopusDelete from "./OctopusDelete"
import { getSingleOctopus } from "../../lib/api"
import { isAdmin, isAuthenticated } from "../../lib/auth"
import OctopusEdit from "./OctopusEdit"
import ImagesShow from "../images/ImagesShow"
import AddImage from "../images/AddImage"



export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)
  const [sightingAdded, setSightingAdded] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const { id } = useParams()
  const isLoggedIn = isAuthenticated()

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
            <div className="text-center w-full flex flex-col md:flex-row gap-4 items-center md:items-start md:w-max">
              <section className="p-4 flex flex-col md:w-1/2">
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
                        </h1>
                        <span className="text-sm">
                          ({octopusData.scientific_name})
                        </span>
                        <p><strong className="text-white">Bio:</strong> {octopusData.description}</p>
                        <p><strong className="text-white">Life span:</strong> {octopusData.life_span} years.</p>
                      </>
                    )}
                  </div>
                </div>
                <ImagesShow images={octopusData.images} setIsComplete={setIsComplete} />
              </section>
              <section className="card px-4 flex items-center md:w-1/2">
                <div className="card card-body flex justify-center items-center md:w-max" >
                  <SightingShow
                    sightings={octopusData.sightings}
                    sightingsThisWeek={octopusData.sightings_this_week}
                    sightingsThisMonth={octopusData.sightings_this_month}
                    octopusName={octopusData.name}
                    setIsComplete={setIsComplete}
                  />
                  {isLoggedIn &&
                    <>
                      <AddSighting id={id} setSightingAdded={setSightingAdded} />
                      <AddImage id={octopusData.id} setIsComplete={setIsComplete} />
                    </>
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
