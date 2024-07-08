import axios from "axios"

const baseUrl = 'http://localhost:8000/api'

export function getAllOctopus() {
  return axios.get(`${baseUrl}/octopus/`)
}

export function getSingleOctopus(id) {
  return axios.get(`${baseUrl}/octopus/${id}`)
}



// * AUTH

export function register(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}