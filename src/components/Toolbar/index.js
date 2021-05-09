import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout as logoutAction} from '../../store/actions'
import s from './Toolbar.module.css'

const Toolbar = ({isAuthenticated, user, jwt, dispatch}) => {

    const logout = () => {
        window.localStorage.removeItem('jwt')
        dispatch(logoutAction());
        
    }

    const links = [
        {url: '/', title: 'Home'},
        {url: '/write', title: 'Write'},
        
    ]

    if(!jwt){
        links.push(
            {url: '/login', title: 'Login'},
            {url: '/register', title: 'Register'}
        )
    }

    return (

        <nav className={s.navbar}>
            <Link className={s.appLogo} to='/'>
                yaz bi blog
            </Link>

            <ul className={s.navList}>
                {
                    links.map(link => <ToolbarItem key={link.url} link={link}/>)
                }
                <li className={s.navItem}>
                    {user && <Link className={s.navLink} to={`/mystories/${user.id}`}>My Stories</Link>}
                </li>
                <li className={s.navItem}>
                    {user && <Link className={s.lgtLink} to='/' onClick={logout}>Log Out</Link>}
                </li>
                <li className={s.navItem}>
                    {user && <Link className={s.userLink}>{`Hello, ${user.username}`}</Link>}
                </li>
            </ul>
        
        </nav>

    )
    
    
}

const ToolbarItem = ({link}) => (
    <li className={s.navItem}>
        <Link to={link.url} className={s.navLink}>
            {link.title}
        </Link>
    </li>
)

const mapStateToProps =(state) => {
    
    return {
        jwt: state.jwt,
        user: state.user
    }
}
export default connect(mapStateToProps)(Toolbar);