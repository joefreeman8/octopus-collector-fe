import axios from "axios"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { register } from "../../lib/api"



export default function Register({ toast }) {

  const initialState = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const [formData, setFormData] = useState(initialState)

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await register(formData)
      console.log(res)
    } catch (err) {
      const errorMessage = err.response.data
      console.log(errorMessage)
      Object.values(errorMessage).forEach(error => {
        console.log(error[0])
        toast.info(error[0], {
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
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="card card-compact bg-base-100 bg-opacity-80 shadow-xl p-4">
          <h3 className="text-2xl font-bold">Sign Up</h3>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="input input-bordered"
              name="username"
              value={formData.username}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
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
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Password Confirmation</span>
            </label>
            <input
              name="password_confirmation"
              type="password"
              className="input input-bordered"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button data-theme="nord" type="submit" className="btn btn-warning opacity-80">
              Submit
            </button>
            <p className="mt-2 text-center">Already have an account?&nbsp;
              <Link to='/login'>
                <span className="underline">Login here.</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
