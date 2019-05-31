import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Label, FormGroup, Input, Alert } from 'reactstrap'
import PropTypes from 'prop-types'
import { register } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    teamName: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if(error !== prevProps.error) {
      // Check for register error
      if(error.id === 'REGISTER_FAIL'){
        this.setState({ msg: error.msg.msg})
      } else {
        this.setState({ msg: null })
      }
    }

    if (isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const { name, email, password, teamName } = this.state

    // Create user obj
    const newUser = {
      name,
      email,
      password,
      teamName
    }
    
    // Attempt to register
    this.props.register(newUser)
  }

  render () {
    return (
      <Container className='form-div'>
        <h2 className="pb-2 text-dark mb-2">Register new team</h2>
        { this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>) : null}
        <Form expand='sm' onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for='name'>Full name</Label>
            <Input type='name' name='name' className='login-form' onChange={this.onChange} placeholder='Enter your username here...' />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input type='email' name='email' className='login-form' onChange={this.onChange} placeholder='Enter your email here...' />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input type='password' name='password' minLength='8' className='mb-1' onChange={this.onChange} placeholder='Enter your password here min 8 lenght...' />
          </FormGroup>
          <FormGroup>
            <Label for='teamName'>Team Name</Label>
            <Input type='text' name='teamName' className='mb-1' onChange={this.onChange} placeholder='Select your team name...' />
          </FormGroup>
          <button type='submit' className='larger-btn btn-color'>Register</button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(Register)
