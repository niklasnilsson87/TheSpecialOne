import React, { Component } from 'react'
import { Container, Form, Label, FormGroup, Input, Alert } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

/**
 * Component Login
 *
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state

    const user = {
      email,
      password
    }
    console.log(user)
    this.props.login(user)
  }

  render() {
    return (
      <Container>
        <div className="form-div">
          <h2 className="pb-2 text-dark mb-2">Login</h2>
          {this.state.msg ? (
            <Alert className="alert bg-danger text-white">
              {this.state.msg}
            </Alert>
          ) : null}
          <Form expand="sm" onSubmit={this.onSubmit}>
            <div className="d-flex justify-content-between">
              <FormGroup className="mr-2">
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  className="login-form"
                  onChange={this.onChange}
                  placeholder="Username..."
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  className="mb-1"
                  onChange={this.onChange}
                  placeholder="Password..."
                />
              </FormGroup>
            </div>
            <button type="submit" name="login" className="larger-btn btn-color">
              Login
            </button>
          </Form>
          <NavLink className="text-dark" to="/register">
            Not registered?
          </NavLink>
        </div>
      </Container>
    )
  }
}

// Function to get states for global store.
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)
