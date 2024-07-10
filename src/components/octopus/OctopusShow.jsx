import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import SightingShow from "../sightings/SightingShow"
import AddSighting from "../sightings/AddSighting"
import { deleteSingleOctopus, getSingleOctopus } from "../../lib/api"


export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)
  const [sightingAdded, setSightingAdded] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSingleOctopus(id)
        setOctopusData(data)
        setSightingAdded(false)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id, sightingAdded])

  async function handleDelete() {
    try {
      await deleteSingleOctopus(id)
      toast.info(`${octopusData.name}, has been deleted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/octopus')
    } catch (err) {
      const error = err.response.data.detail
      toast.info(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }


  return (
    <div className="h-screen">
      {octopusData && (
        <>
          <button onClick={handleDelete} className="btn btn-error">Delete</button>
          <div className="flex justify-center items-center mt-24">
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
              <div className="p-4 md:w-1/2">
                <div className="card bg-base-100 bg-opacity-90 mb-5 shadow-xl">
                  <div className="card-body flex items-center">
                    <h1 className="text-white card-title text-center w-fit">
                      {octopusData.name}
                      <span className="text-sm">
                        ({octopusData.scientific_name})
                      </span>
                    </h1>
                    <p><strong className="text-white">Bio:</strong> {octopusData.description}</p>
                    <p><strong className="text-white">Life span:</strong> {octopusData.life_span} years.</p>
                  </div>
                </div>
              </div>
              <div className="card px-4 md:w-1/2">
                <div className="card card-body space-y-4 flex justify-center items-center md:w-full" >
                  <SightingShow
                    sightings={octopusData.sightings}
                    sightingsThisWeek={octopusData.sightings_this_week}
                    sightingsThisMonth={octopusData.sightings_this_month}
                    octopusName={octopusData.name}
                  />
                  <AddSighting id={id} setSightingAdded={setSightingAdded} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
