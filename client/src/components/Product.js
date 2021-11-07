import React from 'react';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

function Product({ product }) {
    const { productid, image, name, rating, price } = product;
    return (
        <div className="col-md-3 m-3 card p-2 text-left" key={productid} >
            <div>
                <Link to={`product/${productid}`}>
                    <div className="text-center">
                        <img src={image} className="img-fluid" />
                    </div>
                    <h1 className="psName">{name}</h1>
                    <Rater rating={rating} total={5} interactive={false} />
                    <h1 className="psPrice">Price: {price}</h1>
                </Link>
            </div>
        </div>
    )
}

export default Product
