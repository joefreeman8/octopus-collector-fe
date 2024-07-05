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
        <div className="pt-10">
          <h1 className="font-bold text-success-content opacity-80 text-4xl text-center">Select an Octopus</h1>
          <div className="m-10 grid grid-cols-3 gap-4">
            {octopusData.map(octopus => (
              <Link key={octopus.id} to={`/octopus/${octopus.id}`}>
                <div data-theme="nord" className="card bg-accent opacity-80 shadow-xl hover:bg-warning hover:bg-opacity-100">
                  <div className="card-body">
                    <h2 className="card-title flex justify-center">
                      {octopus.name}
                    </h2>
                    <span className="text-sm text-center">({octopus.scientific_name})</span>
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
