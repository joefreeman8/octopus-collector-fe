import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/octopus/${id}/`)
        setOctopusData(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id])


  console.log(octopusData)

  return (
    <>
      {octopusData && (
        <div className="flex justify-center items-center">
          <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
            <div className="p-4 md:w-1/2">
              <div className="card bg-base-100 mb-5 shadow-xl">
                <div className="card-body flex items-center">
                  <h1 className="text-white card-title text-center w-fit">
                    {octopusData.name} <span className="text-sm">({octopusData.scientific_name})</span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="card px-4 md:w-1/2">
              <div className="card card-body space-y-4 flex justify-center items-center md:w-full" >
                <h1 className="text-white text-lg font-bold">Recent Sightings</h1>
                {octopusData.sightings.map((sighting) => (
                  <div key={sighting.id}>
                    <p>{sighting.location}</p>
                    <p>{sighting.date}</p>
                    <p>{sighting.sighting_owner.username}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
