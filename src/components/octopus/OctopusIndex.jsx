import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"


export default function OctopusIndex() {

  const [octopusData, setOctopusData] = useState(null)


  async function fetchOctopusData() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/octopus')
      setOctopusData(data)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(octopusData)

  useEffect(() => {
    fetchOctopusData()
  }, [])


  return (
    <div className="h-screen">

      {octopusData && (
        <div className="mt-10">
          <h1 className="font-bold text-4xl text-center">Find Your Octopus</h1>
          <div className="m-10 grid grid-cols-3 gap-4">
            {octopusData.map(octopus => (
              <Link key={octopus.id} to={`/octopus/${octopus.id}`}>
                <div className="card bg-base-200 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title flex justify-center">
                      {octopus.name} <span className="text-sm">({octopus.scientific_name})</span>
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
