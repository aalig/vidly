/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash'
import React, { Component } from 'react'
import { toast } from 'react-toastify'
import ListGroup from './../../common/utils/listGroup'
import Pagination from './../../common/utils/pagination'
import { getGenres } from './../../../services/genreService'
import { getMovies, deleteMovie } from './../../../services/movieService'
import paginate from './../../../utils/paginate'
import MoviesTable from './moviesTable'
import { Link } from 'react-router-dom'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  }

  async componentDidMount() {
    const { data } = await getGenres()
    const { data: movies } = await getMovies()

    const genres = [{ _id: '', name: 'All Genres' }, ...data]
    this.setState({ movies, genres, selectedGenre: genres[0] })
  }

  getPgaedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies }
  }

  handleAddMovie = () => {}

  handleDelete = async (id) => {
    const originalMovies = this.state.movies
    const movies = originalMovies.filter((m) => m._id !== id)
    this.setState({ movies })

    try {
      await deleteMovie(id)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('The movie has already been deleted')
      this.setState({ movies: originalMovies })
    }
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    movies[index] = movie
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page })
  }

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn })
  }

  getMessage = () => {
    const count = this.state.movies.length
    return count === 0
      ? 'There are no movies in the database'
      : 'Showing {count} movies in the database'
  }

  render() {
    const { length: count } = this.state.movies
    if (count === 0)
      return <p className='lead'>There are no movies in the database</p>

    const { currentPage, pageSize, sortColumn } = this.state
    const { totalCount, data: movies } = this.getPgaedData()

    return (
      <div className='row'>
        <div className='col-3 m-2'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <Link className='btn btn-primary btn-lg mt-2 mb-2' to='/movies/new'>
            Add Movie
          </Link>
          <p className='lead'>There are {totalCount} movies in the database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            itemsCount={totalCount}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
