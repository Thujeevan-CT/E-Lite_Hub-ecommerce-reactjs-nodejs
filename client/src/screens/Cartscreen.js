import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from './../actions/cartActions';
import Checkout from './../components/Checkout';

function Cartscreen() {

    const cartreducerstate = useSelector(state => state.cartReducer);
    const dispatch = useDispatch();
    const { cartItems } = cartreducerstate;
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div>
            <div className="row mt-3 justify-content-center">
                <div className="col-md-8 card">
                    <h1 className="text-center m-4">MY CART</h1>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => {
                                return <tr>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <select value={item.quantity} onChange={(e) => { dispatch(addToCart(item, e.target.value)) }}>
                                            {[...Array(item.countInStock).keys()].map((v, i) => {
                                                return <option value={i + 1}>{i + 1}</option>
                                            })}
                                        </select>
                                    </td>
                                    <td>{item.quantity * item.price}</td>
                                    <td><i class="fas fa-trash-alt" onClick={() => { dispatch(deleteFromCart(item)) }}></i></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <hr />
                    <h2 className="text-center">SubTotal: {subTotal} Rs/-</h2>
                    <hr />
                    <Checkout amount={subTotal} />
                </div>
            </div>
        </div>
    )
}

export default Cartscreen
