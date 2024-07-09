import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SightingShow from "../sightings/SightingShow"
import { getSingleOctopus } from "../../lib/api"


export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSingleOctopus(id)
        setOctopusData(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id])


  console.log(octopusData)



  return (
    <div className="h-screen">
      {octopusData && (
        <div className="flex justify-center items-center mt-24">
          <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
            <div className="p-4 md:w-1/2">
              <div className="card bg-base-100 bg-opacity-90 mb-5 shadow-xl">
                <div className="card-body flex items-center">
                  <h1 className="text-white card-title text-center w-fit">
                    {octopusData.name} <span className="text-sm">({octopusData.scientific_name})</span>
                  </h1>
                  <p><strong className="text-white">Bio:</strong> {octopusData.description}</p>
                  <p><strong className="text-white">Life span:</strong> {octopusData.life_span} years.</p>
                </div>
              </div>
            </div>
            <div className="card px-4 md:w-1/2">
              <div className="card card-body space-y-4 flex justify-center items-center md:w-full" >
                <SightingShow sightings={octopusData.sightings} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
