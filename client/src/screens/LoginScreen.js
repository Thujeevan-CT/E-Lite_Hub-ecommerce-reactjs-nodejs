import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from 'react-router-dom';

export default function LoginScreen() {

    const loginReducer = useSelector(state => state.loginReducer);
    const { loading, error } = loginReducer;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    function login(e) {
        e.preventDefault()
        const user = {
            email: email,
            password: password
        }
        dispatch(loginUser(user));
    }

    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
            window.location.href = '/'
        }
    }, [])

    return (
        <div className="loginScreen">
            <div className="row justify-content-center m-3">
                <div className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
                    <div className="div">
                        <h2 className="text-center m-3 rlh" style={{ display: "inline" }}>LOGIN</h2>
                        <i style={{ fontSize: '25px' }} className="fa fa-sign-in" aria-hidden="true"></i>

                        {error && (<Error error='Invalid Credentials' />)}
                        {loading && (<Loader />)}

                        <form onSubmit={login} style={{ marginTop: '1.5rem' }}>

                            <input
                                type="text"
                                placeholder="Email"
                                className="form-control inm"
                                value={email}
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />

                            <div className="text-center">
                                <button type='submit' className="btn mt-3">
                                    LOGIN
                                </button>
                            </div>
                        </form>

                    </div>

                    <Link to="/register" className='logReg mt-3'>Register Page</Link>
                </div>
            </div>
        </div>
    );
}