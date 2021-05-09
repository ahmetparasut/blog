import React from 'react';
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import s from './RegisterPage.module.css'


class RegisterPage extends React.Component {
    state= {
        username:'',
        email:'',
        password:'',
        
    }


    setUsername = (event) => {
        this.setState({username: event.target.value})
    }

    setEmail = (event) => {
        this.setState({email: event.target.value})
    }

    setPassword = (event) => {
        this.setState({password: event.target.value})
    }

    register = async (event) => {
        event.preventDefault();

        const registerForm = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }

        const response = await fetch('http://localhost:1337/auth/local/register', {
            method:'POST',
            body: JSON.stringify(registerForm),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        window.localStorage.setItem('jwt', data.jwt)

        this.setState({
            username:'',
            email:'',
            password:''
        })

        this.props.history.replace('/login')

    }


    render () {

        const {username, email, password} = this.state
        return (
            <div className={s.registerPage}>
                

                <div className={s.registerFormWrapper}>
                    <div className={s.registerCard}>
                        <form onSubmit={this.register}>
                            <label className={s.label}>Username</label>
                            <input 
                                placeholder='Enter a username'
                                value={username}
                                name='username'
                                onChange={this.setUsername}
                                />
                            
                            <label className={s.label}>Email</label>
                            <input 
                                placeholder='Enter a valid email' 
                                type='email'
                                value={email}
                                onChange={this.setEmail}/>
                            
                            <label className={s.label}>Password</label>
                            <input 
                                placeholder='Enter your password' 
                                type='password'
                                value={password}
                                onChange={this.setPassword}/>
                            
                            
                            <button className={s.btn} type='submit'>Register</button>

                            <p>Already have an account? <Link className={s.link} to='/login'>Login here.</Link></p>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(RegisterPage);