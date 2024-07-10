
export default function SightingShow({ sightings, sightingsThisWeek, sightingsThisMonth, octopusName }) {


  function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-')
    return `${day}-${month}-${year}`
  }

  return (
    <>
      <h1 className="text-white text-lg font-bold">Recent Sightings</h1>
      <div>
        {sightingsThisWeek ? (
          <div data-theme='nord' className="card card-normal bg-accent p-4">
            The {octopusName} has been spotted this week!
          </div>
        ) : sightingsThisMonth ? (
          <div data-theme='nord' className="card card-normal bg-info text-black p-4">
            The {octopusName} has been seen in the last 28 days!
          </div>
        ) : (
          <div data-theme='nord' className="card card-normal bg-error p-4">
            The {octopusName} has not been spotted for a while!
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <table className="table table-zebra">
          <thead className="text-sm">
            <tr>
              <th className="text-white">Date</th>
              <th className="text-white">Location</th>
              <th className="text-white">User</th>
            </tr>
          </thead>
          <tbody>
            {sightings.map((sighting, idx) => (
              <tr key={sighting.id}>
                {idx < 10 &&
                  <>
                    <td>{formatDate(sighting.date)}</td>
                    <td>{sighting.location}</td>
                    <td>{sighting.sighting_owner.username}</td>
                  </>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
