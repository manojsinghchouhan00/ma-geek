import axios from 'axios';
import React, { Component } from 'react'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            loginId: "",
            password: "",
            msg: "",
            error:false
        }
    }
    handleSubmit = () => {
        console.log("handleSubmit", this.state)
        axios.post("https://manraj-ors-1.onrender.com/login",
         {loginId :this.state.loginId, password :this.state.password }).then((res) => {
            console.log(res.data);
            // if (result.data._id) {
            //     localStorage.setItem("token", JSON.stringify(result.data))
            // }


            if (res.data.message === 'Enter LoginId And Password') {
                this.setState({ msg: res.data.message })
                this.setState({ error: true })
            } else if (res.data.message === 'No result found') {
                this.setState({ msg: res.data.message })
                this.setState({ error: true })
            }  else {
                localStorage.setItem("token", JSON.stringify(res.data));
                this.setState({ msg: "" })
                this.setState({ error: false })
                window.location.pathname="/"
                // localStorage.setItem("auth", JSON.stringify(res.data.auth))
                // navigate("/")
            }
        })
    }
    render() {
        // console.log("first",this.state.msg ,this.state.error)
        return (
            <div>
                {this.state.error && <p >{this.state.msg}</p>}

                <input type="text" placeholder='Enter your email' value={this.state.email} onChange={(e) => this.setState({ loginId: e.target.value })} /> <br /><br />
                <input type="text" placeholder='Enter your password' value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} /> <br /><br />
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        )
    }
}
