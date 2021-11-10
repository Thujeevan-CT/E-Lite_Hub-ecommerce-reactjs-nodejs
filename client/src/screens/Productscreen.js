import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import Loader from './../components/Loader';
import Error from './../components/Error';
import Review from '../components/Review';

function Productscreen({ match }) {

    const productid = match.params.id;
    const dispatch = useDispatch();
    const getProductByIdState = useSelector(state => state.getProductByIdReducer);
    const { product, loading, error } = getProductByIdState;
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        dispatch(getProductById(productid));
    }, [])

    function addtoCart() {
        if (localStorage.getItem('currentUser')) {
            dispatch(addToCart(product, quantity));
        } else {
            window.location.href = '/login'
        }
    }

    return (
        <div>

            {loading ? (<Loader />
            ) : error ? (<Error error="Something went wrong" />
            ) : (
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card p-2 m-2">
                            <h1 style={{ fontSize: '30px' }}>{product.name}</h1>
                            <img src={product.image} className="img-fluid m-3 imgPro " />
                            <p className='pt-2'>{product.description}</p>
                        </div>
                    </div>
                    <div className="col-md-6 text-center">
                        <div className="m-2 pt-3">
                            <h1 style={{ fontSize: '25px', color: '#0287cf' }}>Price: {product.price}.00</h1>
                            <hr />
                            <h1 style={{ fontSize: '25px' }}>Select Quantity: </h1>
                            <select className='select' value={quantity} onChange={(e) => setQuantity(e.target.value)} >
                                {[...Array(product.countInStock).keys()].map((x, i) => {
                                    return <option value={i + 1}>{i + 1}</option>

                                })};
                            </select>
                            <hr />
                            <button className="btn btn-primary" onClick={addtoCart} >ADD TO CART</button>
                        </div>
                        <hr />
                        <Review product={product} />
                    </div>
                </div>
            )}


        </div>
    )
}

export default Productscreen;
