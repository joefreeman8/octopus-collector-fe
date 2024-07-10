import axios from "axios"
import { getToken } from "./auth"

const baseUrl = 'http://localhost:8000/api'


function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function getAllOctopus() {
  return axios.get(`${baseUrl}/octopus/`)
}

export function getSingleOctopus(id) {
  return axios.get(`${baseUrl}/octopus/${id}/`)
}

export function deleteSingleOctopus(id) {
  return axios.delete(`${baseUrl}/octopus/${id}`, headers())
}

// * SIGHTING

export function postSighting(formData) {
  return axios.post(`${baseUrl}/sightings/`, formData, headers())
}

// * AUTH

export function register(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function login(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}