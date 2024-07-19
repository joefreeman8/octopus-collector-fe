import { useState } from 'react';
import { isAdmin, isOwner } from '../../lib/auth';
import SightingDelete from './SightingDelete';

export default function SightingShow({ sightings, sightingsThisWeek, sightingsThisMonth, octopusName, setIsComplete }) {
  const [currentPage, setCurrentPage] = useState(1)
  const sightingsPerPage = 5

  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-')
    return `${day}-${month}-${year}`
  }

  const indexOfLastSighting = currentPage * sightingsPerPage
  const indexOfFirstSighting = indexOfLastSighting - sightingsPerPage
  const currentSightings = sightings.slice(indexOfFirstSighting, indexOfLastSighting)

  const totalPages = Math.ceil(sightings.length / sightingsPerPage)

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <h1 className="text-white text-lg font-bold">Recent Sightings</h1>
      <div className='md:w-full'>
        {sightingsThisWeek ? (
          <div data-theme='nord' className="flex justify-center card card-normal bg-accent p-4">
            The {octopusName} has been spotted {sightingsThisWeek} times this week!
          </div>
        ) : sightingsThisMonth ? (
          <div data-theme='nord' className="card card-normal bg-info text-black p-4">
            The {octopusName} has been seen in the {sightingsThisMonth} times in the last 28 days!
          </div>
        ) : (
          <div data-theme='nord' className="card card-normal bg-error p-4">
            The {octopusName} has not been spotted for a while!
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center my-4">

        {/* Buttons for mobile view */}
        <div className="flex justify-center md:hidden order-2 my-4">
          <button
            data-theme="nord"
            className="btn btn-outline btn-circle btn-accent mx-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button
            data-theme="nord"
            className="btn btn-outline btn-circle btn-accent mx-2"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>

        {/* FULL SCREEN BUTTON <- */}
        <button
          data-theme="nord"
          className="hidden btn btn-outline btn-circle btn-accent order-0 md:block mx-2"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        {/* Table */}
        <div className="order-1 w-full">
          <table className="table table-zebra w-full">
            <thead className="text-sm">
              <tr>
                <th className="text-white">Date</th>
                <th className="text-white">Location</th>
                <th className="text-white">User</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentSightings.map((sighting) => (
                <tr key={sighting.id}>
                  <td>{formatDate(sighting.date)}</td>
                  <td>{sighting.location}</td>
                  <td>{sighting.sighting_owner.username}</td>
                  <td>
                    {(isOwner(sighting.sighting_owner.id) || isAdmin()) &&
                      <SightingDelete
                        id={sighting.id}
                        setIsComplete={setIsComplete}
                      />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* FULL SCREEN BUTTON -> */}
        <button
          data-theme="nord"
          className="btn btn-outline btn-circle btn-accent hidden md:block order-2 mx-2"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>

      </div>
    </>
  )
}