import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'

import { postImage } from "../../lib/api"

export default function AddImage({ id, setIsComplete }) {

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
  return (
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
  )
}
