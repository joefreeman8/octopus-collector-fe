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
    <div>OctopusShow</div>
  )
}
