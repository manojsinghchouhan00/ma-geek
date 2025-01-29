import React, { useEffect, useState } from "react";
import EmptyCart from "./emptyCart";
import '../Style/cart.css';
import axios from "axios";

const Cart = ({ cartItems, removeFromCart }) => {

    const [items, setItems] = useState([]);
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const longText = (text) => {
        if (text.length > 50) {
            return text.substr(0, 50) + "..."
        }
        else {
            return text
        }
    }

    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0)

    const totalAmount = () => {
        let price = 0, discount = 0;
        items.map(item => {
            price += (item.price.mrp * item.quantity)
            discount += ((item.price.mrp - item.price.cost) * item.quantity)
        })
        setPrice(price);
        setDiscount(discount);
    }

    const countItem = (index, calc) => {

        const item = items[index];
        if (calc === "add") {
            item.quantity += 1;
        }
        else {
            item.quantity -= 1;
        }
        items[index] = item;
        const update = [...items]
        setItems(update);
    }

    const initPayment = (data) => {

        const options = {
            key: "rzp_test_IqR6IbViHRVkXQ",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async (response) => {
                try {

                    const verifyLink = "http://localhost:5500/api/payment/verify";
                    const { data } = await axios.post(verifyLink, response);


                } catch (error) {
                    console.log(error);
                }
            }
        }

        const rzp = new window.Razorpay(options);
        rzp.open();

    }
    const handlePayment = async () => {
        try {
            const orderLink = "http://localhost:5500/api/payment/orders";
            const { data } = await axios.post(orderLink, { amount: price - discount + 40 });

            initPayment(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // const updateCart = [...items,cartItems];
        setItems(cartItems);
        totalAmount();
    }, [cartItems, items])

    return (
        <div className="body">
            {console.log(items)}

            {items.length > 0 ?


                <div class="row cart-items-details">
                    <div class=" col-lg-9 col-md-12 col-sm-12 col-xs-12 p-0 pb-2 pe-3 cart-left">
                        <h6 className="m-0 p-2" style={{ backgroundColor: "#fff" }}>My Cart ({items?.length})</h6>

                        {
                            items.map((prod, index) => {
                                return (
                                    <div className="cart-item  ps-3 py-3" >
                                        <div className="cart-item-left">
                                            <img src={prod.url} alt="item" />
                                            <div className="mt-2" style={{ textAlign: "center" }}>
                                                {
                                                    prod.quantity > 1 ? <button type="button" onClick={() => countItem(index, "sub")}>-</button> :
                                                        <button type="button" disabled >-</button>

                                                }
                                                {/* <button type="button" onClick={() => countItem(index, "sub")}>-</button> */}
                                                <span class=' mx-1 px-3' style={{ backgroundColor: "#fff", border: "1px solid #c2c2c2" }}>{prod.quantity}</span>
                                                <button type="button" onClick={() => countItem(index, "add")}>+</button>

                                            </div>
                                        </div>
                                        <div className="cart-item-right ms-5">
                                            <p className="mb-2">{longText(prod.title.longTitle)}</p>
                                            <p className style={{ color: '#878787', fontSize: 14 }}>
                                                Seller:RetailNet
                                                <span><img src={fassured} style={{ width: 70, marginLeft: 10 }} alt="fassured" /></span>
                                            </p>
                                            <div className="my-2">
                                                <span style={{ fontSize: 22, fontWeight: "bold" }}>₹{prod.price.cost}</span>
                                                <span className="mx-2" style={{ color: '#878787' }}><strike>₹{prod.price.mrp}</strike></span>
                                                <span className="mx-2" style={{ color: '#388E3C' }}>₹{prod.price.discount} off</span>
                                            </div>
                                            <button type="button" onClick={() => removeFromCart(prod.id)} style={{ backgroundColor: "white", border: "none", fontWeight: "bold", fontSize: 18 }} >REMOVE</button>
                                        </div>

                                    </div>
                                )
                            })
                        }


                        <div className="order">
                            <button type="button" onClick={handlePayment} className="px-5 py-2 order-button">PLACE ORDER</button>
                        </div>

                    </div>

                    <div class=" col-lg-3 col-md-12 col-sm-12 col-xs-12 px-0 pe-3 cart-right">
                        <h6 className="pt-2 pb-3 ps-3 m-0 " style={{ color: "#878787", fontWeight: "bold", backgroundColor: "#fff" }}>PRICE DETAILS</h6>
                        <div className="px-3 pb-2" style={{ backgroundColor: "#fff" }}>
                            <div className="data">
                                Price ({items?.length} item)
                                <span style={{ float: "right" }}>₹ {price}</span>
                            </div>
                            <div className="data">
                                Discount
                                <span style={{ float: "right" }}> -₹ {discount}</span>
                            </div>
                            <div className="data">
                                Delivery Charges
                                <span style={{ float: "right" }}>₹ 40</span>
                            </div>
                            <hr />
                            <div className="data" style={{ fontSize: "22px" }}>
                                Total Amount
                                <span style={{ float: "right" }}>₹ {price - discount + 40}</span>
                            </div>
                            <p className=" data my-4" style={{ color: "green" }}>You will save ₹{discount - 40} on this order</p>
                        </div>
                    </div>
                </div> :

                <EmptyCart />
            }
        </div>
    )
}

export default Cart;
