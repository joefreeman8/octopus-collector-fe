import OpenAI from "openai"
import { useState } from "react"


export default function OpenAIRequests() {

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

  return (
    <div className="my-5 flex xl:w-1/3 card card-bordered bg-base-100 bg-opacity-60">
      <h2 className="text-center text-lg font-bold p-5">Octopus Facts</h2>
      <span className="text-xs text-center font-bold italic">please note openAI occasionally likes to give repeated answers</span>
      <div className="flex justify-center items-center">
        <button className='btn btn-accent w-48 my-5' onClick={handleSubmit}>OctopusAI Button</button>
      </div>
      {openAIResponse && (
        <p className="p-5">{openAIResponse}</p>
      )}
    </div>
  )
}
