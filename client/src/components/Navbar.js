import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/userActions";

function Navbar() {

    const addToCartReducer = useSelector(state => state.cartReducer);
    const { cartItems } = addToCartReducer;
    const dispatch = useDispatch();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return (
        <nav className="navbar navbar-expand-lg">
            <Link to="/">
                <a className="navbar-brand">E-Lite Hub</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" style={{ color: '#fff' }}><i className="fas fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                <div className="navbar-nav ml-auto">
                    {currentUser ?
                        <div className="dropdown show">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-user"></i> {currentUser.username}
                            </a>

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="/profile">Profile</a>
                                <a className="dropdown-item" href="/orders">Orders</a>
                                <li className="dropdown-item" onClick={() => { dispatch(logoutUser()) }}>Logout</li>
                            </div>
                        </div>
                        :
                        <a className="nav-item nav-link" href="login">Login</a>
                    }
                    <Link to="/cart">
                        <a className="nav-item nav-link cart-icon">
                            <i className="fas fa-shopping-cart"></i> {cartItems.length}
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
