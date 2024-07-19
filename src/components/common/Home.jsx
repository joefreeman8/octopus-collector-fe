import OpenAI from "openai"
import { useState } from "react"


export default function Home() {

  const [openAIResponse, setopenAIResponse] = useState('Fun fact goes here....')
  let isSubmitting = false

  const OPENAI_API_KEY = import.meta.env.VITE_APP_OPENAI_API_KEY

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  })

  const octopusList = [
    'Common Octopus',
    'Giant Pacific Octopus',
    'Blue-Ringed Octopus',
    'Mimic Octopus',
    'Dumbo Octopus',
    'Vampire Squid',
    'Coconut Octopus',
    'Atlantic Pygmy Octopus',
    'Striped Pyjama Octopus',
    'Red Octopus',
    'Maori Octopus',
    'Atlantic White-spotted Octopus',
    'Night Octopus',
    'Mosaic Octopus'
  ]



  async function handleSubmit() {
    if (isSubmitting) return // Prevent multiple submissions
    isSubmitting = true
    setopenAIResponse('Working on it... 🐙')
    const randomOctopus = octopusList[Math.floor(Math.random() * octopusList.length)]

    console.log(randomOctopus)

    try {
      const { choices } = await openai.chat.completions.create({
        model: import.meta.env.VITE_APP_OPENAI_MODEL,
        messages: [
          { role: 'user', content: `Give me a really cool octopus fact for this octopus: ${randomOctopus}, try to find something unique about it. Failing that, provide a generic octopus fact. Ensure this text is 90 words or less.` }
        ],
        max_tokens: 200

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
    <div className="min-h-screen flex justify-center">
      <div className="container h-screen flex flex-col items-center">
        <div className="mt-10 md:mt-5 h-1/5 flex items-end justify-center">
          <div className="flex flex-col p-5 md:p-0">
            <h1 className="text-white text-3xl md:text-4xl font-bold">Welcome to the Octopus Collector</h1>
            <p className="text-base md:text-lg mt-5">Here is a hub where you can browse all the different Octopus, check out their photos & say when you spotted them!</p>
          </div>
        </div>
        <div className="flex flex-col px-5 md:px-0 md:container md:h-4/5 md:mt-12 md:flex-row md:justify-around">
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
          <div className="my-5 flex md:w-1/3 card card-bordered bg-base-100 bg-opacity-60">
            <h2 className="text-center text-lg font-bold p-5">Octopus Facts</h2>
            <span className="text-xs text-center font-bold italic">please note openAI occasionally likes to give repeated answers</span>
            <button className='btn btn-accent my-5 mx-28' onClick={handleSubmit}>OctopusAI Button</button>
            {openAIResponse && (
              <p className="p-5">{openAIResponse}</p>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}
