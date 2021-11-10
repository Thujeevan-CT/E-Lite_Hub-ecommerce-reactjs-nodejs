import React from 'react';
import { Link } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

function Product({ product }) {
    const { productid, image, name, rating, price } = product;
    return (
        <div className="card-product" key={productid} >
            <div>
                <Link to={`product/${productid}`}>
                    <div className="text-center">
                        <img src={image} className="img-fluid" />
                    </div>
                    <div className="desMenu">
                        <h4 className="psName">{name}</h4>
                        <span>Price: </span>
                        <h4 className="psPrice">Rs. {price}.00</h4>
                        <span>Rating: <Rater rating={rating} total={5} interactive={false} /></span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Product
