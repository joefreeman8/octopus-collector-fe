import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import SightingShow from "../sightings/SightingShow"
import AddSighting from "../sightings/AddSighting"
import OctopusDelete from "./OctopusDelete"
import { getSingleOctopus, postImage } from "../../lib/api"
import { isAdmin, isAuthenticated } from "../../lib/auth"
import OctopusEdit from "./OctopusEdit"
import ImagesShow from "../images/ImagesShow"
import { v4 as uuidv4 } from 'uuid'


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

  console.log(octopusData)

  function activateEditMode() {
    setIsEditMode(true)
  }

  const initialData = {
    title: '',
    document: null,
    octopus: id,
  }
  const [formData, setFormData] = useState(initialData)


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  const handleImageChange = (e) => {
    const myFile = e.target.files[0]
    const blob = myFile.slice(0, myFile.size)
    const fileExt = myFile.name.split('.').pop()
    const newFile = new File([blob], `${uuidv4()}.${fileExt}`, { type: `${myFile.type}` })
    setFormData({ ...formData, document: newFile })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await postImage(formData)
      setIsComplete(true)
      setFormData(initialData)
    } catch (err) {
      console.log(err)
    }
  }

  console.log(formData)
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
                </div>
                <ImagesShow images={octopusData.images} />
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
                  {isLoggedIn &&
                    <AddSighting id={id} setSightingAdded={setSightingAdded} />
                  }
                </div>
                <div className="card bg-base-100 card-body mt-5 shadow-lg">
                  <h2 className="md:mt-4 text-white text-lg font-bold">Add Photo</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 w-full mt-5">
                    <label className="input input-bordered flex items-center w-5/6 text-sm bg-base-100" htmlFor="title">
                      <span className="font-bold">Image Title:</span>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="p-2 bg-base-100 "
                      />
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/png, image/jpeg"
                      onChange={handleImageChange}
                      required
                      className="file-input file-input-bordered w-5/6"
                    />
                    <button type="submit" className="btn btn-secondary w-5/6">Add Photo</button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
