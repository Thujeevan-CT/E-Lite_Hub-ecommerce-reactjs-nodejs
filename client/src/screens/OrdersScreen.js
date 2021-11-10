import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../actions/orderAction";
import Loader from "../components/Loader";
import Error from '../components/Error'
import { Link } from "react-router-dom";

export default function OrdersScreen() {

    const orderState = useSelector(state => state.getOrdersByUserIdReducer);

    const { orders, error, loading } = orderState;

    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("currentUser")) {
            dispatch(getOrdersByUserId());
        } else {
            window.location.href = "/login";
        }
    }, [dispatch]);

    console.log(orders)

    return (
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-md-10">
                    <h2>MY ORDERS</h2>
                    <table className="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Total Amount</th>
                                <th>Date</th>
                                <th>Transaction ID</th>
                                <th>Delivery Address</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && (<Loader />)}
                            {orders && (
                                orders.map(order => {
                                    return <tr className="tab-click" onClick={() => { window.location = `/orderinfo/${order.transactionId}` }}>
                                        <td style={{ fontWeight: 'bold' }}>{order.orderid}</td>
                                        <td>Rs. {order.orderAmount}.00</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.transactionId}</td>
                                        <td>{order.shippingAddress}</td>
                                        <td>{order.isDelivered === 'true' ? (<li style={{ color: "red", fontWeight: "bolder" }}>Delivered</li>) : (<li style={{ color: "green", fontWeight: "bolder" }}>Order Placed</li>)}</td>
                                    </tr>
                                }))
                            }
                            {error && (<Error error='something went wrong' />)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


