import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addProductReview } from '../actions/productActions'

export default function Review({ product }) {
    const dispatch = useDispatch()
    const [comment, setcomment] = useState('')
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        Axios.post('/api/products/getallreviews', { pid: product.productid }).then(res => {
            setReviews(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [comment])

    // useEffect(() => {
    //     Axios.post('/api/products/getallreviews', { pid: product.productid }).then(res => {
    //         setReviews(reviews);
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }, [comment])


    function sendreview() {

        if (localStorage.getItem('currentUser')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'))

            var alreadyreviewed;

            for (var i = 0; i < reviews.length; i++) {
                if (reviews[i].userid == currentUser.userid) {
                    alreadyreviewed = true
                }
            }

            if (alreadyreviewed) {
                alert('You have already reviewed this product')
            } else {
                const review = {
                    rating: 4,
                    comment: comment
                }
                dispatch(addProductReview(review, product.productid))
            }
        }
        else {
            window.location.href = '/login'
        }
    }

    return (
        <div className='shadow p-3 mb-5 bg-white rounded ml-2 mr-3'>
            <h2>Give Your Review</h2>

            <input type="text" className="form-control mt-2" value={comment} onChange={(e) => { setcomment(e.target.value) }} />
            <button className='btn mt-3' onClick={sendreview}>Submit Review</button><br />

            <h2 className='mt-3'>Latest Reviews</h2>

            {reviews.length !== 0 ? reviews.map(review => {
                return <div className="text-left">
                    <p>{review.comment}</p>
                    <p>By : <b>{review.name}</b></p>
                    <hr />
                </div>
            }) : <p>No Reviews in this product</p>}
        </div>
    )
}