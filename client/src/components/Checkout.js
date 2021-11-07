import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../actions/orderAction';
import Loader from './Loader';
import Success from './Success';
import Error from './Error';

const Checkout = ({ amount }) => {

    const dispatch = useDispatch();
    const orderState = useSelector(state => state.placeOrderReducer);
    const { loading, success, error } = orderState;

    const tokenHandler = (token) => {
        dispatch(placeOrder(token, amount))
    }

    function validate() {
        if (!localStorage.getItem('currentUser')) {
            window.location.href = '/login'
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {success && (<Success success='Delivery in 3 Days ,Order Placed Successfully...' />)}
            {error && (<Error error='Something Went wrong' />)}

            <StripeCheckout
                token={tokenHandler}
                amount={amount * 100}
                shippingAddress
                currency="LKR"
                stripeKey="pk_test_51JQUDwE8TBaYgLGpfxcamVgstSVHFq3ll0C5nfn59FeJgKA17aApMerDLEp0x373ODYwaROWzOvnJP8bseBkzhzY00sr0ZhHPU">
                <button className="btn" onClick={validate}>Pay Now</button>
            </StripeCheckout>

        </div>
    )
}

export default Checkout
