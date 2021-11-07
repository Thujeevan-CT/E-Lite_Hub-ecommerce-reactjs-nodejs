import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../actions/orderAction";
import Error from "../components/Error";
import Loader from "../components/Loader";
export default function Orderinfo({ match }) {
    const dispatch = useDispatch();
    const orderstate = useSelector((state) => state.getOrderByIdReducer);

    const { order, loading, error } = orderstate;

    useEffect(() => {
        dispatch(getOrderById(match.params.orderid));
    }, [dispatch]);
    return (
        <div>
            {error && <Error error="Something went wrong" />}
            {loading && <Loader />}
            {order && (
                <div>
                    <div className="row justify-content-center">
                        <div className="col-md-5 card">
                            <h2>Items In Your Order</h2>
                            <hr />
                            {order[1].map((item) => {
                                return (
                                    <div className="orderitem">
                                        <h1>{item.name}</h1>
                                        <h1>
                                            Quantity : <b>{item.quantity}</b>
                                        </h1>
                                        <h1>
                                            Price : {item.quantity} * {item.price} ={" "}
                                            Rs. {item.price * item.quantity}.00
                                        </h1>
                                        <hr />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col-md-5 text-right card order-info">
                            <h2>Order Details</h2>

                            <hr />

                            <h3>Order Id : {order[0][0].orderid}</h3>
                            <h3>Total Amount : <b>RS. {order[0][0].orderAmount}.00 </b></h3>
                            <h3>Date Of order : {order[0][0].createdAt.substring(0, 10)}</h3>
                            <h3>Transaction ID : {order[0][0].transactionId}</h3>

                            {order[0][0].isDelivered === 'true' ? (
                                <h3 style={{ color: "red", fontWeight: "bolder", textAlign: "center" }}>Order Delivered</h3>
                            ) : (
                                <h3 style={{ color: "green", fontWeight: "bolder", textAlign: "center" }}>Order Placed</h3>
                            )}

                            <hr />

                            <div className="text-right">
                                <h2>Shipping Details</h2>

                                <hr />

                                <h1 className="text-right">
                                    Address : <b>{order[0][0].shippingAddress}</b>
                                </h1>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            <hr />

            <div className="row justify-content-center">
                <div className="col-md-10">
                    <h2 className="text-left">Replacement Conditions</h2>
                    <p>
                        A free replacement cannot be created for an item which was returned
                        and replaced once earlier. If your item is not eligible for free
                        replacement due to any reason, you can always return it for a
                        refund. If the item has missing parts or accessories, you may try to
                        contact the manufacturer for assistance. Manufacturer contact
                        information can usually be found on the item packaging or in the
                        paperwork included with the item.
                    </p>
                </div>
            </div>
        </div>
    );
}

// [[{"orderid":1,"userid":4,"name":"David","email":"david@mail.com","shippingAddress":"jaff, Jaffna, Sri Lanka","orderAmount":"38400","transactionId":"card_1JrkzRE8TBaYgLGpGxOSQXKz","isDelivered":"false","createdAt":"2021-11-03T15:03:07.000Z","updatedAt":"2021-11-03T15:03:07.000Z"}],[{"orderItemid":1,"transactionId":"card_1JrkzRE8TBaYgLGpGxOSQXKz","userid":4,"name":"Haylou GT1 TWS Bluetooth Earbuds","productid":5,"quantity":1,"price":"4800","createdAt":"2021-11-03T15:03:07.000Z","updatedAt":"2021-11-03T15:03:07.000Z"},{"orderItemid":2,"transactionId":"card_1JrkzRE8TBaYgLGpGxOSQXKz","userid":4,"name":"Samsung Galaxy M51 (Electric Blue, 6GB RAM, 128GB Storage)","productid":2,"quantity":1,"price":"32000","createdAt":"2021-11-03T15:03:08.000Z","updatedAt":"2021-11-03T15:03:08.000Z"},{"orderItemid":3,"transactionId":"card_1JrkzRE8TBaYgLGpGxOSQXKz","userid":4,"name":"Logitech M170 Wireless Mouse, Black","productid":6,"quantity":2,"price":"800","createdAt":"2021-11-03T15:03:08.000Z","updatedAt":"2021-11-03T15:03:08.000Z"}]]