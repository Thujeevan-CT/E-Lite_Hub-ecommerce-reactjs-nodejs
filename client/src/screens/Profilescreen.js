import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/userActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";

export default function Profilescreen() {

    const loginstate = useSelector((state) => state.loginReducer);
    const updateuserstate = useSelector((state) => state.updateReducer);
    const currentUser = loginstate.currentUser;
    const { loading, success, error } = updateuserstate;
    const dispatch = useDispatch();
    const [name, setName] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState("");
    const [cpassword, setcpassword] = useState("");

    function updateHandler(e) {
        e.preventDefault()
        if (password == cpassword) {
            const updateduser = {
                name: name,
                email: email,
                password: password,
            };
            dispatch(updateUser(currentUser.userid, updateduser));
        }
        else {
            alert('Passwords Not matched')
        }
    }

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-5 card p-3" style={{ marginTop: "150px" }}>
                    <div className="div">
                        <h2 className="text-center m-3">Update</h2>

                        {loading && <Loader />}
                        {error && (
                            <Error error="Something went wrong"></Error>
                        )}
                        {success && <Success success="Your Password updated Successfully!" />}

                        <form onSubmit={updateHandler}>
                            <input
                                type="text"
                                placeholder="name"
                                className="form-control"
                                required

                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                placeholder="email"
                                className="form-control"
                                value={email}
                                required
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />

                            <input
                                type="password"
                                placeholder="password"
                                className="form-control"
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
                                value={cpassword}
                                required
                                onChange={(e) => {
                                    setcpassword(e.target.value);
                                }}
                            />

                            <div className="text-right">
                                <button type="submit" className="btn mt-3">
                                    UPDATE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}