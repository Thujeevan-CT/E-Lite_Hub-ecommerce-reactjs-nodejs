import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/userActions";

function Navbar() {
    const userState = useSelector(state => state.loginReducer);
    const addToCartReducer = useSelector(state => state.cartReducer);
    const { cartItems } = addToCartReducer;
    const dispatch = useDispatch();

    let isAdminLoggedIn;
    if (userState.currentUser === null) {
        isAdminLoggedIn = false
    } else {
        if (userState.currentUser.isAdmin === 'true') {
            isAdminLoggedIn = true
        }
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/">
                <a className="navbar-brand" style={{ fontSize: '1.5rem', fontWeight: '600', fontFamily: 'Staatliches', letterSpacing: '2px' }} >E-Lite Hub</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: '#fff' }}><i className="fas fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    {isAdminLoggedIn && <Link className="nav-item nav-link nav-click" to="/admin"><b>Admin</b></Link>}
                    {currentUser ?
                        <div className="dropdown show">
                            <a className="btn btn-secondary dropdown-toggle nav-click userTit" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user"></i> {currentUser.username}
                            </a>



                            <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuLink">
                                {!isAdminLoggedIn && <a className="dropdown-item" href="/orders">Orders</a>}
                                {!isAdminLoggedIn && <a className="dropdown-item" href="/profile">Change Password</a>}
                                <li className="dropdown-item" onClick={() => { dispatch(logoutUser()) }}>Logout</li>
                            </div>

                        </div>

                        :
                        <Link className="nav-item nav-link nav-click" to="/login"><b>Login</b></Link>
                    }
                    {currentUser && !isAdminLoggedIn && <Link to="/cart">
                        <a className="nav-item nav-link cart-icon nav-click">
                            <i className="fas fa-shopping-cart"></i> {cartItems.length}
                        </a>
                    </Link>}
                </div>
            </div>
        </nav >
    )
}

export default Navbar
