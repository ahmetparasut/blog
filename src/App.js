import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import Toolbar from './components/Toolbar'
import s from './App.module.css';
import WritePage from './pages/WritePage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { connect } from 'react-redux';
import {setJwt,setUser} from './store/actions'
import React from 'react';
import MyStories from './pages/MyStories';
import UserDetailPage from './pages/UserDetailPage';
import EditPage from './pages/EditPage';

const PrivateRoute = ({path, children, ...props}) => {

  const jwt = window.localStorage.getItem('jwt')
  return (
    <Route path={path} {...props}>
      {
        jwt ?
        children :
        <Redirect to={{pathname: '/login'}}/>
      }
    </Route>
  )
}




class App extends React.Component {

  componentDidMount() {
    this.tryLogin();
  }

  tryLogin = async () => {
    const jwt = window.localStorage.getItem('jwt');

    if(jwt) {
      const response = await fetch('http://localhost:1337/users/me', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })

      const data = await response.json();
      this.props.dispatch(setUser(data));
      this.props.dispatch(setJwt(jwt));
    }

  }

  
  
  render() {
    return (
    
      <Router>
        <div>
          <Toolbar />
    
            <div className={s.container}>
              <Switch>
                <Route path='/' exact>
                  <HomePage/>
                </Route>
                <PrivateRoute path='/write'>
                  <WritePage/>
                </PrivateRoute>
                <Route path='/register'>
                  <RegisterPage/>
                </Route>
                <Route path='/login'>
                  <LoginPage/>
                </Route>

                <Route path='/mystories/:id'>
                  <MyStories/>
                </Route>

                <Route path='/users/:id'>
                  <UserDetailPage/>
                </Route>

                <Route path='/edit/:id'>
                  <EditPage/>
                </Route>
              </Switch>
            
            </div>
        </div>
          
      </Router>
      
    );
  }
}

export default connect(null)(App);
