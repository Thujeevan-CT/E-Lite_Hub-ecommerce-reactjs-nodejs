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
        dispatch(addToCart(product, quantity));
    }

    return (
        <div>

            {loading ? (<Loader />
            ) : error ? (<Error error="Something went wrong" />
            ) : (
                <div className="row mt-5">
                    <div className="col-md-6">
                        <div className="card p-2 m-2">
                            <h1>{product.name}</h1>
                            <img src={product.image} className="img-fluid m-3 bigImg" />
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="col-md-6 text-left">
                        <div className="m-2">
                            <h1>Price: {product.price}</h1>
                            <hr />
                            <h1>Select Quantity: </h1>
                            <select value={quantity} onChange={(e) => setQuantity(e.target.value)} >
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
