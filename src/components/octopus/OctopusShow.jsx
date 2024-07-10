import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SightingShow from "../sightings/SightingShow"
import AddSighting from "../sightings/AddSighting"
import OctopusDelete from "./OctopusDelete"
import { editSingleOctopus, getSingleOctopus } from "../../lib/api"
import { isAdmin } from "../../lib/auth"

import axios from "axios"

export default function OctopusShow() {

  const [octopusData, setOctopusData] = useState(null)
  const [sightingAdded, setSightingAdded] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const [formData, setFormData] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getSingleOctopus(id)
        setOctopusData(data)
        setSightingAdded(false)
        setIsComplete(false)
        setFormData({
          name: octopusData.name,
          scientific_name: octopusData.scientific_name,
          description: octopusData.description,
          life_span: parseInt(octopusData.life_span),
          sightings: octopusData.sightings.map(sighting => sighting.id)
        })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [id, sightingAdded, isComplete])

  console.log(octopusData.sightings.map(sighting => sighting.id))

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await editSingleOctopus(id, formData)
      setIsComplete(true)
      setIsEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function editButton() {
    setIsEditMode(true)
  }

  function handleCancelClick(e) {
    e.preventDefault()
    setIsModalOpen(true)
  }

  function confirmCancel() {
    setIsEditMode(false)
    setIsModalOpen(false)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  return (
    <div className="h-screen">
      {octopusData && (
        <>
          {isAdmin() && (
            <>
              {isEditMode ? (
                <button className="btn btn-warning mr-2 btn-disabled">Edit</button>
              ) : (
                <button onClick={editButton} className="btn btn-warning mr-2">Edit</button>
              )}
              <OctopusDelete id={id} octopusName={octopusData.name} />
            </>
          )}
          <div className="flex justify-center items-center mt-24">
            <div className="text-center flex flex-col md:flex-row gap-4 justify-center md:items-start">
              <div className="p-4 md:w-1/2">
                <div className="card bg-base-100 bg-opacity-90 mb-5 shadow-xl">
                  <div className="card-body flex items-center">
                    {isEditMode ? (
                      <div className="bordered">
                        <h1 className="text-white text-lg font-bold">Edit Octopus Details</h1>
                        <form className="form-control mt-5" onSubmit={handleSubmit}>
                          <div className="md:flex gap-2">
                            <label className="input input-bordered flex items-center gap-2 text-sm text-base-content" htmlFor="name">
                              <span className="font-bold">Name:</span>
                              <input type="text" id="name" className="grow" name="name" value={formData.name} onChange={handleChange} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 text-sm" htmlFor="scientific_name">
                              <span className="font-bold">Scientific Name:</span>
                              <input type="text" id="scientific_name" className="grow" name="scientific_name" value={formData.scientific_name} onChange={handleChange} />
                            </label>
                          </div>
                          <textarea className="mt-2 textarea textarea-bordered placeholder-base-content" placeholder="Bio" name="description" value={formData.description} onChange={handleChange}></textarea>
                          <select className="mt-2 select select-bordered w-full" name="life_span" value={formData.life_span} onChange={handleChange}>
                            <option disabled className="font-bold">Maximum Lifespan</option>
                            <option value="1">One Year</option>
                            <option value="2">Two Years</option>
                            <option value="3">Three Years</option>
                            <option value="4">Four Years</option>
                            <option value="5">Five Years</option>
                          </select>
                          <div>
                            <button type="submit" className="m-2 btn btn-secondary">Save Changes</button>
                            <button onClick={handleCancelClick} className="m-2 btn btn-accent">Cancel Changes</button>
                          </div>
                        </form>
                        {isModalOpen && (
                          <div className="modal modal-open modal-bottom sm:modal-middle">
                            <div className="modal-box">
                              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                              <h3 className="font-bold text-lg">Are you sure you want to Cancel your changes?</h3>
                              <div className="modal-action">
                                <button className="btn btn-accent" onClick={confirmCancel}>Yes, Cancel</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
