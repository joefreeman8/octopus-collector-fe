import { useState } from "react"
import { postSighting } from "../../lib/api"
import { toast } from "react-toastify"

export default function AddSighting({ id, setSightingAdded }) {

  const initialState = {
    date: '',
    location: '',
    octopus: Number(id),
  }

  const [formData, setFormData] = useState(initialState)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await postSighting(formData)
      console.log(response)
      setSightingAdded(true)
      setFormData(initialState)
    } catch (err) {
      const errorMessage = err.response.data
      Object.values(errorMessage).forEach(error => {
        toast.info(error[0], {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const SEAS_OPTIONS = [
    { location: 'Atlantic Ocean' },
    { location: 'Pacific Ocean' },
    { location: 'Indian Ocean' },
    { location: 'Arctic Ocean' },
    { location: 'Southern Ocean' },
    { location: 'Carribean Sea' },
    { location: 'Philippine Sea' },
    { location: 'Coral Sea' },
    { location: 'Mediterranean Sea' },
    { location: 'Gulf of Mexico' },
    { location: 'Gulf of Thailand' },
    { location: 'Bay of Bengal' },
    { location: 'Java Sea' },
    { location: 'Red Sea' },
  ]


  return (
    <>
      <h2 className="text-white text-lg font-bold mt-5">Add Sighting</h2>
      <form onSubmit={handleSubmit} className="flex items-center form-control space-y-4 w-5/6">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-5/6"
        />
        <select
          name="location"
          id="location"
          onChange={handleChange}
          className="select select-bordered w-5/6"
        >
          <option value="">Location</option>
          {SEAS_OPTIONS.map(sea => (
            <option key={sea.location} value={sea.location}>
              {sea.location}
            </option>
          ))}
        </select>
        <button data-theme="nord" className="btn btn-warning w-5/6">Add Sighting</button>
      </form>
    </>
  )
}
