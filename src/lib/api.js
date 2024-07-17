import axios from "axios"
import { getToken } from "./auth"

const baseUrl = 'http://localhost:8000/api'


function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * OCTOPUS

export function getAllOctopus() {
  return axios.get(`${baseUrl}/octopus/`)
}

export function getSingleOctopus(id) {
  return axios.get(`${baseUrl}/octopus/${id}/`)
}

export function deleteSingleOctopus(id) {
  return axios.delete(`${baseUrl}/octopus/${id}/`, headers())
}

export function editSingleOctopus(id, formData) {
  return axios.put(`${baseUrl}/octopus/${id}/`, formData, headers())
}

// * SIGHTING

export function postSighting(formData) {
  return axios.post(`${baseUrl}/sightings/`, formData, headers())
}

export function deleteSighting(id) {
  return axios.delete(`${baseUrl}/sightings/${id}`, headers())
}

// * AUTH

export function register(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function login(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

// * IMAGES

export function postImage(formData) {
  return axios.post(`${baseUrl}/images/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data"
    }
  })
}

export function deleteOctopusImage(id) {
  return axios.delete(`${baseUrl}/images/${id}/`, headers())
}