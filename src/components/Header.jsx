import { NavLink } from "react-router-dom";
import logo from '../assets/templogo.png'
export default function Header() {
    return(
        <header className="p-3 bg-dark text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <NavLink href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="bi me-2 rounded-circle" width={42} height={42} role="img" aria-label="cg" src={logo} alt="logo" />
                    </NavLink>
                    <ul className="nav col-12 col-lg-auto me-lh-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink to='/' className={({isActive}) => `nav-link px-2 ${isActive ? 'text-secondary' : 'text-white'}`} >Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/war" className={({isActive}) => `nav-link px-2 ${isActive ? 'text-secondary' : 'text-white'}`}>War</NavLink>
                        </li>
                        <li>
                            <NavLink to="/error" className={({isActive}) => `nav-link px-2 ${isActive ? 'text-secondary' : 'text-white'}`}>Placeholder</NavLink>
                        </li>
                        <li>
                            <NavLink to="/error" className={({isActive}) => `nav-link px-2 ${isActive ? 'text-secondary' : 'text-white'}`}>Placeholder</NavLink>
                        </li>
                        <li>
                            <NavLink to="/error" className={({isActive}) => `nav-link px-2 ${isActive ? 'text-secondary' : 'text-white'}`}>Placeholder</NavLink>
                        </li>
                    </ul>
                    {/* For future account features! */}
                    <div className="ms-auto">
                        <button type="button" className="btn btn-outline-light me-2">Login</button>
                        <button type="button" className="btn btn-warning">Sign-up</button>
                    </div>
                </div>
            </div>

        </header>
    )
}