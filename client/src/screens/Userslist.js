import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUsers } from '../actions/userActions'
import Loader from '../components/Loader'
import Error from '../components/Error'


export default function Userslist() {

    const getallusersstate = useSelector(state => state.getAllUsersReducer)
    const { users, loading, error } = getallusersstate;
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <div>
            <h2>Users List</h2>
            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {loading && (<Loader />)}
                    {error && (<Error error='Something went wrong' />)}
                    {users && (users.map(user => {
                        return <tr key={user.userid}>
                            <td>{user.userid}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td><i class="far fa-trash-alt clicki" onClick={() => { dispatch(deleteUser(user.userid)) }}></i></td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}