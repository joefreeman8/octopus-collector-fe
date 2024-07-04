import { useEffect, useState } from "react"

import axios from "axios"

export default function OctopusIndex() {

  const [octopus, setOctopus] = useState(null)

  async function fetchOctopusData() {
    try {
      const { data } = await axios.get('http://localhost:8000/api/octopus')
      setOctopus(data)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(octopus)

  useEffect(() => {
    fetchOctopusData()
  }, [])


  return (
    <div>OctopusIndex</div>
  )
}
