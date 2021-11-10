import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from '../components/Product';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../actions/productActions';
import Loader from './../components/Loader';
import Error from './../components/Error';
import Filter from './../components/Filter';
import './products.css'

function Homescreen() {

    const getAllProductsState = useSelector(state => state.getAllProductsReducer);
    const { loading, products, error } = getAllProductsState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProducts());
    }, [])


    return (
        <div>
            <div>
                <div class="slideshow_1 q1">
                </div>
            </div>
            <Filter />
            <div className="flex-container" style={{ width: "100%" }}>

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
