import { useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../Redux/Actions/Auth.action';
import { useDispatch } from 'react-redux';

const MainLayout = () => {
    const auth = useSelector((state:{auth:{isAuth: boolean, token: string}})=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutOperation = async() =>{
        await logout(auth.token);
        dispatch({type: "LOGOUT"});
        return navigate("/");
    };
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">ChatApp</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        auth && auth.isAuth ?
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/chats">Messages</NavLink>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link active" type='button' aria-current="page" onClick={logoutOperation}>Logout</button>
                            </li>
                        </>
                        :<>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/register">Register</NavLink>
                            </li>
                        </>
                    }
                    
                </ul>
                </div>
            </div>
        </nav>

        <div className="container">
            <div className='mt-3' style={{display: !auth.isAuth ? "block": "none"}}>
                
                <div className="card mb-2">
                    <div className="card-body">
                        This is some text within a card body.
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout