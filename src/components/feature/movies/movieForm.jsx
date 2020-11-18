import React from 'react'
import Form from './../../common/form/form'
import Joi from 'joi-browser'
import { getGenres } from './../../../services/genreService'
import { getMovie, saveMovie } from './../../../services/movieService'

class MovieForm extends Form {
  state = {
    movies: [],
    genres: [],
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    errors: {},
  }

  async populateGenres() {
    const { data: genres } = await getGenres()
    this.setState({ genres })
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id
      if (movieId === 'new') return

      const { data: movie } = await getMovie(movieId)
      this.setState({ data: this.mapToViewModel(movie) })
      console.log('Data', this.state.data)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace('/not-found')
    }
  }

  async componentDidMount() {
    await this.populateGenres()
    await this.populateMovie()
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required().integer().min(0).max(100),
    dailyRentalRate: Joi.number().required().min(0).max(5),
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  doSubmit = async () => {
    await saveMovie(this.state.data)
    this.props.history.push('/movies')
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.rednderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default MovieForm
