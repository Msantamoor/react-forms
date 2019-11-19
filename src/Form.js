import React from 'react';
import './form.css'


function validate(fname, lname, email, phone, age, password, cpassword) {
    return {
        fname: fname.length === 0,
        lname: lname.length === 0,
        email: email.length === 0,
        phone: phone.length < 10 || phone.length > 10,
        age: age < 14,
        password: password.length === 0,
        cpassword: cpassword !== password || cpassword.length === 0
    }
    
}

export default class Form extends React.Component {
    state = {
        fname: "",
        lname: "",   
        email: "",
        phone: "",
        age: "",
        password: "",
        cpassword: "",

        touched: {
            fname: false,
            lname: false,   
            email: false,
            phone: false,
            age: false,
            password: false,
            cpassword: false,
        }

    };

    change = e => {
        this.setState({
        [e.target.name]: e.target.value
        })
    };

    handleBlur = (field) => (e) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
      }

    onSubmit = e => {
        e.preventDefault()
        this.props.onSubmit(this.state);
        this.setState({
            fname: "",
            lname: "",   
            email: "",
            phone: "",
            age: "",
            password: "",
            cpassword: "",

            touched: {
                fname: false,
                lname: false,   
                email: false,
                phone: false,
                age: false,
                password: false,
                cpassword: false,
            }
            
        })
    }

    render(){
        const errors = validate(this.state.fname, this.state.lname, this.state.email, this.state.phone, this.state.age, this.state.password, this.state.cpassword);        
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        
        const showErr = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];
      
            return hasError ? shouldShow : false;
          };

          const showValid = (field) => {
            //const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return shouldShow ? true : false
            
          };

          
        return (
            
            <form>
                <h3>New User Registration</h3>
                <input 
                name="fname" 
                className={showErr('fname') ? "error" : ""}
                filled={showValid('fname') ? "good" : ""}
                onBlur={this.handleBlur('fname')}
                placeholder="First Name"
                value={this.state.fname} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('fname') ? "fname-err" : ""}>Enter First Name</p>
                <br/>
                <input 
                name="lname" 
                className={showErr('lname') ? "error" : ""}
                filled={showValid('lname') ? "good" : ""}
                onBlur={this.handleBlur('lname')}
                placeholder="Last Name" 
                value={this.state.lname} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('lname') ? "lname-err" : ""}>Enter Last Name</p>
                <br/>
                <input 
                name="email"
                className={showErr('email') ? "error" : ""}
                filled={showValid('email') ? "good" : ""}
                onBlur={this.handleBlur('email')}
                placeholder="Email Address" 
                value={this.state.email} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('email') ? "email-err" : ""}>Enter a valid Email address</p>
                <br/>
                <input 
                name="phone"
                className={showErr('phone') ? "error" : ""}
                filled={errors.phone ? "" : "good"}
                onBlur={this.handleBlur('phone')}
                placeholder="Phone" 
                type="tel"
                maxLength="14"
                value={errors.phone ? (this.state.phone.replace(/[^0-9]/g, '')) : ("(" + this.state.phone.slice(0,3) + ')-'  + this.state.phone.slice(3, 6) + '-' + this.state.phone.slice(6))} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('phone') ? "phone-err" : ""}>Please enter a valid phone number</p>
                <br/>
                <input 
                name="age"
                className={showErr('age') ? "error" : ""}
                filled={showValid('age') ? "good" : ""}
                onBlur={this.handleBlur('age')}
                placeholder="Age" 
                type="number"
                value={this.state.age} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('age') ? "age-err" : ""}>You must be over 13 to use this site, I won't protect your information.</p>
                <br/>
                <input 
                name="password"
                className={showErr('password') ? "error" : ""}
                filled={showValid('password') ? "good" : ""}
                onBlur={this.handleBlur('password')}
                placeholder="Password"
                type="password" 
                value={this.state.password} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('password') ? "password-err" : ""}>Enter a good password</p>
                <br/>
                <input 
                name="cpassword"
                className={showErr('cpassword') ? "error" : ""}
                filled={showValid('cpassword') ? "good" : ""}
                onBlur={this.handleBlur('cpassword')}
                placeholder="Confirm Password"
                type="password" 
                value={this.state.cpassword} 
                onChange={e => this.change(e)}
                />
                <br/>
                <p className="hidden-messages" id={showErr('cpassword') ? "cpassword-err" : ""}>Passwords must match</p>
                <br/>
                <p className="hidden-messages" id={isEnabled ? "Ready" : ""}>Ready to submit</p>
                <br/>
                <button disabled={!isEnabled} onClick={e => this.onSubmit(e)}>Create Account</button>
                
            </form>
        )
    }
}