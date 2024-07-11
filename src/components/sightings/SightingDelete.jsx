import { deleteSighting } from "../../lib/api"

export default function SightingDelete({ id, setIsComplete }) {

  async function handleDelete(e) {
    const sightingId = e.target.id
    try {
      await deleteSighting(sightingId)
      setIsComplete(true)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <button
      id={id}
      onClick={handleDelete}
      className='btn btn-outline btn-circle btn-sm btn-error'
    >
      x
    </button>
  )
}
