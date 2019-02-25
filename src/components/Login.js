import React, { Component } from 'react';
import { Button, } from "react-bootstrap";
import { Redirect} from 'react-router-dom';
import Profile from './Profile';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            toDashboard: false,
            email_hint:'',
            password_hint:''
        };
      }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        if(this.state.email === 'info@test.com' && this.state.password ==='ok'){
            this.setState({
                toDashboard: true
            });
        }
        if(this.state.email !== 'info@test.com'){
            this.setState({email_hint:'Please type: info@test.com'});
        }
        else{
            this.setState({email_hint:''});
        }
        if(this.state.password !== 'ok'){
            this.setState({password_hint:'Please type: ok'});
        }
        else{
            this.setState({password_hint:''});
        }
        event.preventDefault();

    }
    render() {
        
        if (this.state.toDashboard === true) {
            return <Redirect to="/profile" component={Profile} />
        }

        return (
            <section className="wrapper-login-form">
                <div className="container">
                    <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h3>Log in</h3>
                        <div className="wrap-login">
                            <form onSubmit={this.handleSubmit}>
                                <p>
                                    <label>Email</label>
                                    <input type="text" name="email"
                                    onChange={this.handleChange} value={this.state.email}/>
                                    <span style={{fontSize:'13px'}}>{this.state.email_hint}</span> 
                                </p>
                                <p>
                                    <label>Password</label>
                                    <input type="password" name="password"
                                onChange={this.handleChange} value={this.state.password}/>
                                    <span style={{fontSize:'13px'}}>{this.state.password_hint}</span> 
                                </p>
                                
                                <div className="wrapper-button">
                                    <Button type="submit"  disabled={!this.validateForm()}>Sign In</Button> 
                                </div>
                                <p style={{textAlign:'center',marginTop:'10px'}}>Don't have an account yet? <a href="#">Sign Up </a> now</p>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>            
           
        );
    }
}
export default Login;