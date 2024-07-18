import OpenAI from "openai"
import { useState } from "react"


export default function Home() {

  const [openAIResponse, setopenAIResponse] = useState(null)
  let isSubmitting = false

  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })



  async function handleSubmit() {
    if (isSubmitting) return // Prevent multiple submissions
    isSubmitting = true
    setopenAIResponse('Working on it... 🐙')

    try {
      const { choices } = await openai.chat.completions.create({
        model: import.meta.env.VITE_APP_OPENAI_MODE,
        messages: [{ role: 'user', content: 'Give me a really cool octopus fact, it can be generic or from any species if they have a unique fact.' }]

      })
      setopenAIResponse(choices[0].message.content)

    } catch (error) {
      console.error('Error:', error)
    } finally {
      isSubmitting = false // Reset the flag after request
    }
  }

  console.log(openAIResponse)

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
          <div className="my-5 flex md:w-1/3 card card-bordered bg-base-100 bg-opacity-50">
            <h2 className=" text-center font-bold p-5">Octopus Facts below</h2>
            <span className="text-xs text-center font-bold italic">please note the AI occasionaly likes to give repeated answers</span>
            <button className='btn btn-warning mt-5 mx-28' onClick={handleSubmit}>OctopusAI Button</button>
            {openAIResponse && (
              <p className="p-5">{openAIResponse}</p>
            )}
          </div>
          <div className="my-5 flex md:w-1/3 card card-bordered bg-base-100 bg-opacity-40">
            <p className="px-5 pt-5">
              Why on Earth would somebody spend hours of their time making a project such as this I hear you ask?
            </p>
            <p className="px-5 pt-3">
              Well there is two reasons really.
            </p>
            <p className="px-5 pt-3">
              Firstly, I needed to practice some coding goodness and show you that this is the guy you want to hire!
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
        </div>
      </div>
    </div >
  )
}
