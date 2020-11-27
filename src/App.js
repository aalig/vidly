import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import auth from './services/authService'
import ProtectedRoute from './components/common/utils/protectedRoute'
import Movies from './components/feature/movies/movies'
import NavBar from './components/common/nav/navbar'
import Customers from './components/feature/customers/customers'
import Rentals from './components/feature/rentals/rentals'
import LoginForm from './components/common/form/loginForm'
import Logout from './components/common/nav/logout'
import NotFound from './components/common/utils/notFound'
import MovieForm from './components/feature/movies/movieForm'
import RegisterForm from './components/common/form/registerForm'
import './App.css'

class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className='container'>
          <Switch>
            <ProtectedRoute path='/movies/:id' component={MovieForm} />
            <Route
              path='/movies'
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default App
