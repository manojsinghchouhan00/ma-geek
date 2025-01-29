import React, { Component } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import Link and useHistory hook

class Dashboard extends Component {
    constructor(props) {
        super(props);
        // this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout = () =>{
        console.log("logout");
        localStorage.clear();
        // Redirect to the login page
        window.location.href = "/login"; // Use window.location.href for redirection
    }

    render() {
        let auth = JSON.parse(localStorage.getItem("token"));

        return (
            <div>
                <ul id='nav'>
                    {
                        !auth ? (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Registration</Link></li>
                                <li><Link to="/qrapp">QR code generator</Link></li>
                                <li><Link to="/qrlist">Qr data</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/pure">Pure comp</Link></li>
                                <li><Link to="/head">Header</Link></li>
                                <li><Link to="/update">update</Link></li>
                                <li><Link to="/unmount">Unmount</Link></li>
                                <li> <button onClick={this.handleLogout}>Logout</button></li>
                            </>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Dashboard;
