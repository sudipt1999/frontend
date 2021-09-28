import axios from 'axios';
import {React, Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

class RegisterCoach extends Component {
 state={
    name: "",
    password: "",
    dob: null,
    gender: null,
    mobile: null,
    speciallity: '',
    error: false,
    errorMessage: '',
    success: false,
    successMessage: ''
 }

 registerCoach = (e) => {
    const err = this.validate();
    if(err != null) {
        this.setState({
            errorMessage: err,
            error: true
        })
        return;
    }

    const data = this.state;
    axios.post("http://localhost:8080/coaches", data)
    .then(res => {
        console.log("SUCCESS ", res.data)
        this.setState({
            success: true,
            successMessage: `Coach created with id : ${res.data.id}`
        })
    })
    .catch(err => {
        console.log("ERRROR ", err)
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
     if(state.name.length == 0) {
         return "Name cannot be empty !"
     }

     if(state.name.length < 3 || state.name.length > 50) {
         return "Name should be between 3 to 50 characters"
     }

     if(state.password.length <= 5 || state.password.length > 10) {
         return "Password should be between 5 and 10 characters"
     }

     if(state.dob == null) {
         return "Date of birth cannot be null"
     }

    let dob = new Date(state.dob);  
    let month_diff = Date.now() - dob.getTime();  
    let age_dt = new Date(month_diff);       
    let year = age_dt.getUTCFullYear();  
    let age = Math.abs(year - 1970);
    

    if(age < 20 || age > 100) {
        return "Age should be between 20 and 100"
    }

     if(state.gender == null) {
         return "Please select the appropriate gender"
     }

     if(state.mobile == null || state.mobile.length != 10) {
         return "Please input valid mobile number"
     }

     if(state.speciallity.length < 10 || state.speciallity.length > 50) {
         return "Speciallity should be between 10 and 50 characters"
     }

     return null;
 }

 render() {
     console.log("PROPS", this.props)
     if(this.state.success) {
         return (
             <div className="container">
                 <h3>Life Coach Created</h3>
                 <h3>{this.state.successMessage}</h3>
                 <Link to='/loginCoach'>
                    <button type="button" className="btn btn-primary">Login Coach</button>
                </Link>
             </div>
         )
     }
     return (
         <>
         {(this.state.error) ? (
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error </strong> {this.state.errorMessage}
                <button onClick={()=>this.setState({error: false, errorMessage: ''})}type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            ): null}
         <div className="container mt-5">
             <div className="row">
                <h3>Life Coach Profile</h3>
             </div>

             <div className="row mt-3">
                <div className="col form-group">
                    <label for="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        className="mx-2"
                        value={this.state.name}
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

            {/* DOB and Gender */}
            <div className="row mt-3">
                <div className="col form-group">
                    <label for="dob">Date of Birth</label>
                    <input 
                        type="date" 
                        id="dob" 
                        name="dob"
                        className="mx-2"
                        value={this.state.dob}
                        onChange={this.change}
                        required
                    />
                </div>

                <div className="col form-group">
                    <label>Gender</label>
                    <input 
                        type="radio"
                        value="male"
                        name="gender"
                        checked={this.state.gender === "male"}
                        onChange={this.change}
                    /> Male

                    <input 
                        type="radio"
                        value="female"
                        name="gender"
                        checked={this.state.gender === "female"}
                        onChange={this.change}
                    /> Female
                </div>
             </div>


            {/* Mobile and Speciality */}
            <div className="row mt-3">
                <div className="col form-group">
                    <label>Mobile</label>
                    <input 
                        type="number" 
                        id="mobile" 
                        name="mobile"
                        className="mx-2"
                        value={this.state.mobile}
                        onChange={this.change}
                        required
                    />
                </div>

                <div className="col form-group">
                    <label>Speciallity</label>
                    <input 
                        type="text" 
                        id="speciallity" 
                        name="speciallity"
                        className="mx-2"
                        value={this.state.speciallity}
                        onChange={this.change}
                        required
                    />
                </div>
             </div>

             <button 
                type="button" 
                className="btn btn-primary mt-4"
                onClick={this.registerCoach}
                >
                    Register
            </button>
             
         </div>
         </>
     )
 }


}

export default RegisterCoach;