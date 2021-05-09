import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import s from './LoginPage.module.css'
import {setJwt, setUser} from '../../store/actions'


class LoginPage extends React.Component {
    state= {
        identifier:'',
        password:''
    }


    setIdentifier = (event) => {
        this.setState({identifier: event.target.value})
    }

    setPassword= (event) => {
        this.setState({password: event.target.value})

        
    }

    login = async (event) => {
        event.preventDefault();

        const loginForm = {
            identifier: this.state.identifier,
            password: this.state.password
        }

        const response = await fetch('http://localhost:1337/auth/local', {
            method: 'POST',
            body: JSON.stringify(loginForm),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        window.localStorage.setItem('jwt', data.jwt)
        this.props.dispatch(setJwt(data.jwt));
        this.props.dispatch(setUser(data.user));

        this.setState({
            identifier: '',
            password: '',
        })

        
        this.props.history.replace('/')

    }

    render () {
        const {identifier, password} = this.state
        return (
            
            <div className={s.registerPage}>
                
                
                <div className={s.registerFormWrapper}>
                    <div className={s.registerCard}>
                        <form onSubmit={this.login}>
                            
                            <label className={s.label}>Username or Email</label>
                            <input 
                                placeholder='Enter your username or email...' 
                                name='identifier'
                                value={identifier}
                                onChange={this.setIdentifier}/>
                            
                            <label className={s.label}>Password</label>
                            <input 
                                placeholder='Enter your password' 
                                type='password'
                                name='password'
                                value={password}
                                onChange={this.setPassword}/>
                            
                            <button className={s.btn} type='submit'>Login</button>

                            
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        jwt: state.jwt,
        user:state.user
    }
}

export default connect(mapStateToProps)(withRouter(LoginPage)) ;