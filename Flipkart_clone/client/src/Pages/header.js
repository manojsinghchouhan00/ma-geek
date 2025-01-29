import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/dataProvider';
import '../Style/header.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const signupInitialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: ""
}
const loginInitialValues = {
    email: "",
    password: ""
}

function Header({ cartItems }) {

    const profile = useContext(DataContext);

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [suggestion, showSuggestion] = useState([]);
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [text, setText] = useState(null);
    const [signUpValue, setSignUpValue] = useState(signupInitialValues);
    const [loginValue, setLoginValue] = useState(loginInitialValues);
    const [error, setError] = useState(false);

    const handleSignUp = (e) => {
        setSignUpValue({ ...signUpValue, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        setLoginValue({ ...loginValue, [e.target.name]: e.target.value });
    }

    function toggleProfileHover() {
        const profileHoverButton = document.querySelector('.profilehover');
        if (profileHoverButton.style.display === 'none') {
            profileHoverButton.style.display = 'block';
        } else {
            profileHoverButton.style.display = 'none';
        }
    }

    const Logout = () => {
        profile.setAccount('');
    }

    const signupUser = async () => {

        try {

            axios({
                url: "http://localhost:5500/signup",
                method: "post",
                headers: { "Content-Type": "application/JSON" },
                data: signUpValue
            })
                .then((response) => {
                    if (response.data.message === "exist") {
                        alert("Email-id/ Username already exist...");
                    }
                    else {
                        // profile.setAccount(signUpValue.username);
                        alert("Account is created successfully, Now you can login");
                    }
                    setSignUp(false)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async () => {

        try {

            axios({
                url: "http://localhost:5500/login",
                method: "post",
                headers: { "Content-Type": "application/JSON" },
                data: loginValue
            })
                .then((response) => {
                    if (response.data.message === "success") {
                        profile.setAccount(response.data.login[0].username);
                        setLogin(false);
                        setError(false);
                    }
                    else {
                        setError(true);
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch = (text) => {
        console.log(text);
        setText(text);
        showSuggestion(products.filter(item => item.title.shortTitle.toLowerCase().includes(text.toLowerCase())));

    }

    useEffect(() => {
        axios.get('http://localhost:5500/products')
            .then(response => {
                setProducts(response.data.products);
            })
    }, [])


    return (
        <div>

            {/* <!-- Navigation --> */}
            <nav class="nav">
                <div class="logo">
                    <img src="../images/flipkart logo.jpg" alt="logo" onClick={() => navigate('/')} />
                </div>
                <div class="searches" style={{ position: "relative" }}>
                    <input type="text" name="search" placeholder="Search for products, brands and more" onChange={(e) => handleSearch(e.target.value)} />
                    <i class="bi bi-search"></i>
                    {
                        text &&
                        <div className='searchinput'>
                            {suggestion.map(prod => {
                                return (
                                    <div className='my-2 ms-3' style={{ cursor: "pointer" }} onClick={() => { navigate(`/detail/${prod.id}`, handleSearch('')) }}>
                                        <img src={prod.url} style={{ width: 55 }} />
                                        <span>{prod.title.shortTitle}</span>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    }
                </div>

                {/* Login or UserName button */}
                {profile.account ?
                    <div>
                        <button className="profileButton" onClick={toggleProfileHover}>
                            {profile.account}
                            <i class="bi bi-chevron-down angle_down profileArrow"></i>
                        </button>
                        <button className='profilehover' onClick={() => Logout()}>
                            <i class="bi bi-power m-2"></i>
                            Logout
                        </button>
                    </div>
                    : <div>
                        <input type="button" value="Login" class="loginButton" onClick={() => { setLogin(true)}} />
                        <div class="Loginhover" >
                            <div class="triangle"></div>

                            <div class="menuList">
                                <div class="signList" >
                                    <p className='mt-1'>New Customer</p>
                                    <button type='button' class="signUp  btn text-primary pt-0 mt-0" onClick={() => { setSignUp(true) }} >Sign UP</button>
                                </div>

                                <div class="profileList">
                                    <i class="bi bi-person-circle"></i>
                                    <p>My Profile</p>
                                </div>
                                <div class="profileList">
                                    <i class="bi bi-plus-circle"></i>
                                    <p>Flipkart Plus zone</p>
                                </div>
                                <div class="profileList">
                                    <i class="bi bi-bag-plus-fill"></i>
                                    <p>Orders</p>
                                </div>
                                <div class="profileList">
                                    <i class="bi bi-gift-fill"></i>
                                    <p>Gift Cards</p>
                                </div>
                            </div>
                        </div>
                    </div>

                }

                <a href="#" class="navLink" >Become a Seller</a>
                <a href="#" class="navLink">
                    More
                    <i class="bi bi-chevron-down angle_down"></i>
                </a>
                <button type='button' onClick={() => navigate("/cart")} class="navLink btn text-light" style={{ position: "relative" }}>
                    {cartItems.length > 0 ? <div className='itemNumbers'>{cartItems?.length}</div> : ""}
                    <i class="bi bi-cart3 cart me-2"></i>
                    Cart
                </button>
            </nav>


            <Modal
                isOpen={login}
                style={customStyles}
            >
                <div className='Modal'>
                    <i class="bi bi-x-lg close-icon" onClick={() => { setLogin(false); setError(false) }}></i>
                    <div className='ModalLeft'>
                        <h4>Login</h4>
                        <p className='mt-4'>Get access to your Orders, Wishlist and Recommendations</p>
                    </div>

                    <div className='ModalRight'>
                        <form>
                            <div class="form-floating ">
                                <input type="email" class="form-control float" id="floatingInput" placeholder="Enter Email Id" name='email' onChange={(e) => { handleLogin(e) }} required />
                                <label htmlFor="floatingInput" class="ps-0">Enter Email Id</label>
                            </div>
                            <div class="form-floating mt-3">
                                <input type="password" class="form-control float" id="floatingPassword" placeholder="Enter Password" name='password' onChange={(e) => { handleLogin(e) }} required />
                                <label htmlFor="floatingPassword" class="ps-0">Enter Password</label>
                            </div>

                            {error && <div className='text-danger mt-2'>Please enter valid Email ID/Password</div>}

                            <p>By continuing, you agree to Flipkart's <span style={{ color: "#2874f0" }}>Terms of Use</span> and <span style={{ color: "#2874f0" }}>Privacy Policy.</span></p>

                            <button type="button" class="btn btn-login" onClick={loginUser}>Login</button>

                            <p className='mt-3' style={{ fontSize: "16px" }}>OR</p>

                            <button type="button" class="btn btn-OTP">Request OTP</button>
                        </form>

                        <div >
                            <button type="button" className="btn text-primary mt-5" onClick={() => { setLogin(false); setError(false); setSignUp(true) }}>New to Flipkart? Create an account</button>
                        </div>

                    </div>
                </div>

            </Modal>

            <Modal
                isOpen={signUp}
                style={customStyles}
            >
                <div className='Modal'>
                    <i class="bi bi-x-lg close-icon" onClick={() => { setSignUp(false) }}></i>
                    <div className='ModalLeft'>
                        <h4>Looks like you're new here!</h4>
                        <p className='mt-4'>Sign up with your mobile number to get started</p>
                    </div>

                    <div className='ModalRight'>
                        <form>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control float floatingInput" placeholder="Enter Firstname" name='firstname' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingInput" class="ps-0">Enter Firstname</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control float floatingInput" placeholder="Enter Lastname" name='lastname' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingInput" class="ps-0">Enter Lastname</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control float floatingInput" placeholder="Enter Username" name='username' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingInput" class="ps-0">Enter Username</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control float floatingInput" placeholder="Enter Email" name='email' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingInput" class="ps-0">Enter Email</label>
                            </div>
                            <div class="form-floating">
                                <input type="password" class="form-control float floatingPassword" placeholder="Enter Password" name='password' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingPassword" class="ps-0">Enter Password</label>
                            </div>
                            <div class="form-floating">
                                <input type="tel" class="form-control float floatingPassword mt-2" placeholder="Enter Phone" name='phone' onChange={(e) => { handleSignUp(e) }} required />
                                <label htmlFor="floatingPassword" class="ps-0">Enter Phone</label>
                            </div>
                            <p>By continuing, you agree to Flipkart's <span style={{ color: "#2874f0" }}>Terms of Use</span> and <span style={{ color: "#2874f0" }}>Privacy Policy.</span></p>

                            <button type="button" class="btn btn-login" onClick={signupUser}>Continue</button>

                        </form>

                        <div >
                            <button type="button" className="btn text-primary " onClick={() => { setLogin(true); setSignUp(false) }}> Already have an account ? Login</button>
                        </div>

                    </div>
                </div>

            </Modal>

        </div>
    );
}

export default Header;