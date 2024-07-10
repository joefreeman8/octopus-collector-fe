import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { deleteSingleOctopus } from "../../lib/api"


export default function OctopusDelete({ id, octopusName }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  function openDeleteModal() {
    setIsModalOpen(true)
  }

  function closeDeleteModal() {
    setIsModalOpen(false)
  }

  async function handleDelete() {
    try {
      await deleteSingleOctopus(id)
      toast.info(`${octopusName}, has been deleted`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/octopus')
    } catch (err) {
      const error = err.response.data.detail
      toast.info(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <>
      <button onClick={openDeleteModal} className="btn btn-error">Delete</button>
      {isModalOpen && (
        <div className="modal modal-open sm:modal-middle">
          <div className="modal-box">
            <button onClick={closeDeleteModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h2 className="font-bold text-lg">{octopusName}</h2>
            <p className="py-4">Are you sure you want to delete this Octopus?</p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-error">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
