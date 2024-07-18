
export default function Home() {
  return (
    <div className="h-screen flex justify-center">
      <div className="container h-screen flex flex-col items-center border">
        <div className="mt-5 h-1/5 flex items-end justify-center">
          <div className="flex flex-col">
            <h1 className="text-white text-4xl font-bold">Welcome to the Octopus Collector</h1>
            <p className="text-lg mt-5">Here is a hub where you can browse all the different Octopus, check out their photos & say when you spotted them!</p>
          </div>
        </div>
        <div className="container h-4/5 mt-12 flex flex-row justify-around border">
          <div className="mt-5 flex h-1/3 md:w-1/4 card card-bordered bg-base-100 bg-opacity-30">
            <p className="p-5">This project stems from my love of Octopus (weird I know), but these creatures are the aliens of our sea, something so different to a mammel, but also so incredibly smart</p>

          </div>
          <div className="mt-5 flex h-1/2 md:w-1/4 card card-bordered bg-base-100 bg-opacity-30">
            <p className="px-5 pt-5">Why on Earth would somebody spend hours of their time making a project such as this I hear you ask?</p>
            <p className="px-5 pt-3">Well there is two reasons really.</p>
            <p className="px-5 pt-3">Firstly, I needed to practice some Django goodness and show all you guys that this is the guy you want to hire!</p>
            <p className="px-5 pt-3">And second, Octopus are my favourite animals!
              <span className="italic"> (weird I know)</span>
              , I see these creatures as the aliens of our planet. Something which is so different to a mammal, yet still incredibly smart.</p>

            <p className="text-xs italic text-bold p-5">Special shout out to squid and cuttlefish too.</p>
          </div>
        </div>
      </div>
    </div >
  )
}
