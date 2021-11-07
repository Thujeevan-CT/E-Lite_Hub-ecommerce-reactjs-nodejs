import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import Loader from './../components/Loader';
import Error from './../components/Error';
import Filter from './../components/Filter';

function Homescreen() {

    const getAllProductsState = useSelector(state => state.getAllProductsReducer);
    const { loading, products, error } = getAllProductsState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])


    return (
        <div>
            <Filter />
            <div className="row justify-content-center" style={{ width: "100%" }}>

                {loading ? <Loader /> : error ? <Error error="Something went wrong." />
                    : (
                        products.map(product => {
                            return <Product product={product} />
                        })
                    )
                }

            </div>
        </div>
    )
}

export default Homescreen
