import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../Style/detail.css';


function Detail({ addToCart, cartItems }) {

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    // const itemExist = cartItems.find(item => item.id === product.id);

    const itemExist = cartItems.find(item => item.id === (product[0]?.id));

    const handleAddToCart = () => {
        addToCart(product)
        navigate("/cart");
    }
    useEffect(() => {

        try {
            // Product By id API
            axios.get(`http://localhost:5500/product/${id}`)
                .then(async res => {
                    let info = res.data.detail
                    setProduct(info);
                })
        }
        catch (error) {
            console.log("Error is: ", error);
        }

    },[id])
    return (

        <div style={{ backgroundColor: "#f2eded" }}>
            {console.log(product)}

            <div className="row product-detail">
                <div className=" col-lg-4 col-md-4 col-sm-8 col-xs-12 prod-left">
                    <div className="product-left">
                        <img src={product.map(item => item.detailUrl)[0]} alt="productDetail" />

                        <div style={{ textAlign: "center" }}>
                            {console.log(itemExist)}

                            {
                                !itemExist ? <button type="button" className="mt-3 px-3 py-3 mx-1 text-light border border-none" onClick={handleAddToCart} style={{ backgroundColor: "rgb(255, 159, 0)", width: "46%" }}>
                                    <i class="bi bi-cart-fill"></i>
                                    ADD TO CART
                                </button> : <button type="button" className="mt-3 px-3 py-3 mx-1 text-light border border-none" style={{ backgroundColor: "rgba(255, 159, 0,0.5)", width: "46%" }}>
                                    <i class="bi bi-cart-fill"></i>
                                    Already in Cart
                                </button>

                            }
                       
                            <button type="button" className="mt-3 px-3 py-3 mx-1 text-light border border-none" style={{ backgroundColor: "rgb(251, 100, 27)", width: "46%" }}>
                                <i class="bi bi-lightning-fill"></i>
                                BUY NOW
                            </button>
                        </div>
                    </div>
                </div>
                <div class=" col-lg-8 col-md-8 col-sm-8 col-xs-12  prod-right">
                    <div className="product-right">
                        <h5>{product.map(item => item.title.longTitle)[0]}</h5>
                        <div style={{ color: '#878787', fontSize: 14 }}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{ width: 70, marginLeft: 10 }} alt="fassured" /></span>
                        </div>
                        <div className="mt-1">
                            <span style={{ fontSize: 28 }}>₹{product.map(item => item.price.cost)[0]}</span>
                            <span className="mx-2" style={{ color: '#878787' }}><strike>₹{product.map(item => item.price.mrp)[0]}</strike></span>
                            <span className="mx-2" style={{ color: '#388E3C' }}>₹{product.map(item => item.price.discount)[0]} off</span>
                        </div>
                        <h6 className="my-3">Available offers</h6>
                        <div>
                            <h6 className="my-2"><i class="bi bi-tag-fill me-1 text-success"></i>Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</h6>
                            <h6 className="my-2"><i class="bi bi-tag-fill me-1 text-success"></i>Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</h6>
                            <h6 className="my-2"><i class="bi bi-tag-fill me-1 text-success"></i>Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</h6>
                            <h6 className="my-2"><i class="bi bi-tag-fill me-1 text-success"></i>Partner OfferExtra 10% off upto ₹500 on next furniture purchase</h6>
                        </div>


                        <table className="mt-4" style={{ fontSize: "16px" }}>
                            <tbody >
                                <tr style={{ verticalAlign: "top" }} >
                                    <td style={{ color: '#878787' }} className="ps-3 pe-5 pb-5">Delivery</td>
                                    <td style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</td>
                                </tr>
                                <tr style={{ verticalAlign: "top" }}>
                                    <td style={{ color: '#878787' }} className="ps-3 pe-5 pb-5">Warranty</td>
                                    <td >No Warranty</td>
                                </tr>
                                <tr style={{ verticalAlign: "top" }}>
                                    <td style={{ color: '#878787' }} className="ps-3 pe-5 pb-5">Seller</td>
                                    <td >
                                        <div style={{ color: '#2874f0' }}>SuperComNet</div>
                                        <div>GST invoice available</div>
                                        <div>View more sellers starting from ₹{product.map(item => item.price.cost)[0]}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} className="py-2">
                                        <img src={adURL} style={{ width: 390 }} alt="superCoin" />
                                    </td>
                                </tr>
                                <tr style={{ verticalAlign: "top" }}>
                                    <td style={{ color: '#878787' }} className="ps-3 pe-5 ">Description</td>
                                    <td style={{ fontSize: "14px" }}>{product.map(item => item.description)[0]}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Detail;