import OpenAIRequests from "../openAI/OpenAIRequests";

export default function Home() {



  return (
    <div className="h-screen flex justify-center">
      <div className="container h-screen flex flex-col items-center">
        <div className="mt-5 h-1/5 flex items-end justify-center">
          <div className="flex flex-col">
            <h1 className="text-white text-4xl font-bold">Welcome to the Octopus Collector</h1>
            <p className="text-lg mt-5">Here is a hub where you can browse all the different Octopus, check out their photos & say when you spotted them!</p>
          </div>
        </div>
        <div className="container h-4/5 mt-12 flex flex-row justify-around">

          <div className="my-5 flex md:w-1/3 card card-bordered bg-base-100 bg-opacity-60">
            <p className="px-5 pt-5">
              Why on Earth would somebody spend hours of their time making a project such as this I hear you ask?
            </p>
            <p className="px-5 pt-3">
              Well there are two reasons really.
            </p>
            <p className="px-5 pt-3">
              Firstly, I needed to practice some coding goodness and show you that this is the guy you want to <span className="tooltip text-accent underline" data-tip="pretty please">hire!</span>
            </p>
            <p className="px-5 pt-3">
              Second, Octopus are my favourite animals!
              <span className="italic text-sm"> (weird I know)</span>
              , I see these creatures as the aliens of our planet. With their fluidness Octopus change shape, morph colours, swap out textures of their skin, taste with their suckers and problem solve.
            </p>
            <p className="px-5 pt-3">
              While diving in Mexico I got to follow these guys around the corals and watch them hunt at night, it was an experience for me that will forever stay on my highlight reel.
            </p>
            <p className="text-xs italic text-bold p-5">
              Special shout out to squid and cuttlefish too.
            </p>
          </div>
          <OpenAIRequests />
        </div>
      </div>
    </div >
  )
}
