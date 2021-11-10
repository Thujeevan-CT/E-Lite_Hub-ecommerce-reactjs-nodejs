import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../actions/productActions'
export default function Productslist() {
    const dispatch = useDispatch()
    const getallproductsstate = useSelector(state => state.getAllProductsReducer)
    const { products, loading, error } = getallproductsstate

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
    return (
        <div>
            <h2>Products list</h2>
            <table className='table table-bordered table-responsive-sm'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (<Loader />)}
                    {error && (<Error error='something went wrong' />)}
                    {products && (products.map(product => {

                        return <tr key={product.productid}>
                            <td>{product.name}</td>
                            <td>Rs {product.price}.00</td>
                            <td>{product.countInStock}</td>
                            <td>{product.productid}</td>
                            <td className="text-center">
                                <i className="far fa-trash-alt clicki" style={{ marginRight: '16px', }} onClick={() => { dispatch(deleteProduct(product.productid)) }}></i>
                                <Link to={`/admin/editproduct/${product.productid}`}><i className="fas fa-edit"></i></Link>
                            </td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}