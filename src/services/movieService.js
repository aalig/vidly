import http from './httpService'
import { apiEndpoint } from './../config.json'

function movieUrl(id) {
  return `${apiEndpoint}${'movies'}/${id}`
}
export function getMovies() {
  return http.get(`${apiEndpoint}${'movies'}`)
}

export function getMovie(id) {
  return http.get(movieUrl(id))
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie }
    delete body._id

    return http.put(movieUrl(movie._id), body)
  }

  return http.post(`${apiEndpoint}${'movies'}`, movie)
}

export function deleteMovie(id) {
  return http.delete(movieUrl(id))
}
