import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { getAllOrders } from '../actions/orderAction'

export default function Orderslist() {

    const getordersstate = useSelector(state => state.getAllOrdersReducer);
    const { loading, error, orders } = getordersstate;
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error error='something went wrong' />)}
            <h2>Orders List</h2>
            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Email</th>
                        <th>User Id</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Transaction Id</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && (orders.map(order => {
                        return <tr>
                            <td>{order.orderid}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt.slice(0, 10)}</td>
                            <td>{order.transactionId}</td>
                            <td>{order.isDelivered === 'true' ? 'Delivered' : 'Order Placed'}</td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}