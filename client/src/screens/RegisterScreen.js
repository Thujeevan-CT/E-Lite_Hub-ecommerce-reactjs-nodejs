import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { registerNewUser } from '../actions/userActions'
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
export default function RegisterScreen() {

    const registerState = useSelector(state => state.registerNewUserReducer)

    const { loading, error, success } = registerState;

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [visible, setVisible] = useState(true);

    const dispatch = useDispatch()

    function register(e) {

        e.preventDefault()
        const user = {
            username: username,
            mobile: mobile,
            email: email,
            password: password
        }

        if (password == confirmPassword) {
            dispatch(registerNewUser(user))
            setUsername('');
            setMobile('')
            setEmail('')
            setPassword('');
            setConfirmPassword('');
        }
        else {
            alert('passwords not matched')
        }

    }

    return (
        <div>
            <div className="row justify-content-center m-3">
                <div className="col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "100px" }}>
                    <div className="div">
                        <h2 style={{ display: "inline" }} className="text-center m-3">Register</h2>
                        <i style={{ fontSize: '25px' }} className="fa fa-user-plus" aria-hidden="true"></i>

                        {error && (<Error error='Email Address is already registered' ></Error>)}
                        {success && (<Success success='Your Registration is successful' />)}

                        <form onSubmit={register}>
                            <input
                                type="text"
                                placeholder="name"
                                className="form-control inm"
                                required
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);

                                }}
                            />
                            <input
                                type="text"
                                placeholder="Mobile"
                                className="form-control inm"
                                required
                                value={mobile}
                                onChange={(e) => {
                                    setMobile(e.target.value);

                                }}
                            />
                            <input
                                type="text"
                                placeholder="email"
                                className="form-control inm"
                                value={email}
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                            <input
                                type="password"
                                placeholder="password"
                                className="form-control inm"
                                value={password}
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />

                            <input
                                type="password"
                                placeholder="confirm password"
                                className="form-control"
                                value={confirmPassword}
                                required
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />

                            <div className="text-center">
                                <button type='submit' className="btn mt-3">
                                    REGISTER
                                </button>
                            </div>
                        </form>


                    </div>
                    <a style={{ color: 'black' }} href="/login" className='m-3'>Click Here To Login</a>
                </div>
            </div>
        </div>
    );
}