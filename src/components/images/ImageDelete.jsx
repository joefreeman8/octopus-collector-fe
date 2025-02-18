import { deleteOctopusImage } from "../../lib/api"

export default function ImageDelete({ modalOctopus, closeImageModal, setIsComplete, setDeleteCheck, deleteCheck }) {

  console.log(deleteCheck)

  function checkDelete() {
    console.log('hello')
    setDeleteCheck(true)
    console.log('second')
    console.log(deleteCheck)
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
        <button className="btn btn-sm md:btn-md btn-error mt-3" onClick={checkDelete}>Delete Octopus</button>
      ) : (
        <button className="btn btn-sm md:btn-md btn-error mt-3" onClick={handleDelete}>Are you sure? It will be gone forever</button>
      )}
    </>
  )
}
