import {React, Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

class Home extends Component {
 state={

 }

 render() {
     return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col">
                    <h2>We are at the Heart of Appropriate Care</h2>
                </div>
            </div>

            <div className="container mt-5 d-flex">
                <div className="card mx-2" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">Coach</h5>

                        <div className="mt-2">
                            <Link to='/loginCoach'>
                                <button type="button" class="btn btn-primary">Login Coach</button>
                            </Link>
                        </div>
                        
                        <div className="mt-2">
                            <Link to='/registerCoach'>
                                <button type="button" class="btn btn-primary">Register Coach</button>
                            </Link>
                        </div>

                    </div>
                </div>


                <div className="card mx-2" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">User</h5>

                        <div className="mt-2">
                            <Link to='/loginUser'>
                                <button type="button" class="btn btn-primary">Login User</button>
                            </Link>
                        </div>
                        
                        <div className="mt-2">
                            <Link to='/registerUser'>
                                <button type="button" class="btn btn-primary">Register User</button>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
     )
 }


}

export default Home;