import axios from 'axios';
import {React, Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

class LoginUser extends Component {
    state={
        userId: '',
        password: '',
        error: false,
        errorMessage: ''
     }
    
     loginUser = (e) => {
        const err = this.validate();
        
        console.log("VALIDATE ", err)
        if(err != null) {
            this.setState({
                errorMessage: err,
                error: true,
                redirect: false
            })
            return;
        }
        axios.post(`http://localhost:8080/users?id=${this.state.userId}&password=${this.state.password}`)
        .then(res => {
            console.log("SUCCESS ", res)
            this.setState({redirect: true}, () => {
                this.props.setUser({
                    type: 'user',
                    data: res.data
                })
            })
        })  
        .catch(err => {
            console.log("ERROR", err)
            this.setState({
                error: true,
                errorMessage: "User not found"
            })
        })
    
     }
    
     change = (e) => {
         const name = e.target.name;
         const value = e.target.value;
        
         console.log(name, value)
         this.setState({
             [name]: value
         })
     }
    
     validate = () => {
         const state = this.state;
         if(state.userId.length == 0) {
             return "userId cannot be empty !"
         }
    
         if(state.userId.length > 50) {
             return "userId should be less than 50 characters"
         }
    
         if(state.password.length <= 5 || state.password.length > 10) {
             return "Password should be between 5 and 10 characters"
         }
    
         
         return null;
     }
    
     render() {
         console.log("PROPS", this.props)
         if(this.state.redirect) {
             return <Redirect to='/userHome' />
         }
         return (
             <>
             {(this.state.error) ? (
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error </strong> {this.state.errorMessage}
                    <button onClick={()=>this.setState({error: false, errorMessage: ''})}type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                ): null}
             <div className="container mt-5">
                 <div className="row">
                    <h3>Life Coach Login</h3>
                 </div>
    
                 <div className="row mt-3">
                    <div className="col form-group">
                        <label for="userId">User Id</label>
                        <input 
                            type="text" 
                            id="userId" 
                            name="userId"
                            className="mx-2"
                            value={this.state.userId}
                            onChange={this.change}
                            required
                        />
                    </div>
    
                    <div className="col form-group">
                        <label for="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            className="mx-2"
                            value={this.state.password}
                            onChange={this.change}
                            required
                        />
                    </div>
                    
                 </div>
    
                 <button 
                    type="button" 
                    className="btn btn-primary mt-4"
                    onClick={this.loginUser}
                    >
                        Login
                </button>
                 
             </div>
             </>
         )
     }
    
    

}

export default LoginUser;