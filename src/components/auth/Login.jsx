import { useState } from "react"
import { Link } from 'react-router-dom'
import { login } from "../../lib/api"
import { useNavigate } from "react-router-dom"



export default function Login({ toast }) {

  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await login(formData)
      localStorage.setItem('token', data.token)

      toast.info(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      navigate('/octopus')
    } catch (err) {
      const errorMessage = err.response.data
      Object.values(errorMessage).forEach(error => {
        console.log(error)
        toast.info(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      })
    }
  }

  return (
    <div className="flex justify-center min-h-screen">
      <form className="w-full max-w-lg mt-24" onSubmit={handleSubmit}>
        <div className="card card-compact bg-base-100 bg-opacity-80 shadow-xl p-4">
          <h3 className="text-2xl font-bold">Login!</h3>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered"
              placeholder="Enter Password"
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button data-theme="nord" type="submit" className="btn btn-warning opacity-80">
              Submit
            </button>
            <p className="mt-2 text-center">Don&apos;t have an account?&nbsp;
              <Link to='/sign-up'>
                <span className="underline">Sign up here.</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
