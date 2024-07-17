import { useState } from "react"
import { deleteOctopusImage } from "../../lib/api"


export default function ImageDelete({ modalOctopus, closeImageModal, setIsComplete }) {

  const [deleteCheck, setDeleteCheck] = useState(false)

  function checkDelete() {
    setDeleteCheck(true)
  }
  async function handleDelete() {
    try {
      await deleteOctopusImage(modalOctopus.id)
      setDeleteCheck(false)
      closeImageModal()
      setIsComplete(true)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      {!deleteCheck ? (
        <button className="btn btn-error mt-3" onClick={checkDelete}>Delete Octopus</button>
      ) : (
        <button className="btn btn-error mt-3" onClick={handleDelete}>Confirm you want to delete, it will be gone forever</button>
      )}
    </>
  )
}
