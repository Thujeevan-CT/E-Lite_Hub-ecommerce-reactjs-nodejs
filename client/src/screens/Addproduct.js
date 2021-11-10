import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productActions";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";

export default function Addproduct() {
    const [name, setname] = useState("");
    const [price, setprice] = useState();
    const [countinstock, setcountinstock] = useState();
    const [imageurl, setimageurl] = useState("");
    const [category, setcategory] = useState("mobiles");
    const [description, setdescription] = useState("");
    const dispatch = useDispatch();

    const addproductstate = useSelector(state => state.addProductReducer);

    const { success, error, loading } = addproductstate;

    const addproduct = (e) => {
        e.preventDefault();
        const product = {
            name: name,
            price: price,
            countInStock: countinstock,
            image: imageurl,
            description: description,
            rating: 4,
            category,
        };
        dispatch(addProduct(product));
    };
    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
                    {success && (<Success success='Product Added Succesfully' />)}
                    {loading && (<Loader />)}
                    {error && (<Error error='Something went wrong' />)}
                    <h2>Add Product</h2>
                    <form onSubmit={addproduct}>
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => {
                                setname(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Price"
                            value={price}
                            required
                            onChange={(e) => {
                                setprice(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            required
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => {
                                setdescription(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            required
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Image URL"
                            value={imageurl}
                            onChange={(e) => {
                                setimageurl(e.target.value);
                            }}
                        />

                        <select className="select" defaultValue='mobiles' name="category" id="category" onChange={(e) => {
                            setcategory(e.target.value);
                        }}>
                            <option value="mobiles">Mobiles</option>
                            <option value="electronics">Electronics</option>
                            <option value="laptops">Laptops</option>
                        </select>

                        <input
                            type="text"
                            required
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Count in Stock"
                            value={countinstock}
                            onChange={(e) => {
                                setcountinstock(e.target.value);
                            }}
                        />

                        <button
                            className="btn mt-5"
                            type="submit"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}