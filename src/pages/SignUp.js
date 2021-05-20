import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"
import loginActions from "../redux/actions/loginActions";
import { connect } from "react-redux"
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';


class SignUp extends React.Component{
    toTop= () => {window.scroll({
        top:0, 
        left:0,
        behavior:"smooth"
    })}

    state={
        userInfo:{
            repeatpassword: "",
            firstName: "",
            lastName: "",
            country: "",
            password:"",
            img: "",
            email: "",
        },
        validator:{
            repeatpassword: "",
            firstName: "",
            lastName: "",
            country: "",
            password:"",
            img: "",
            email: "",
        },
    }

    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            [field]: value}
        })
    })



    send = async (e = null, googleUser = null) => {
       e && e.preventDefault()
       let userInfo= e ? this.state.userInfo : googleUser
        if (userInfo.repeatpassword === userInfo.password) {
            const respuesta = await this.props.newUser(userInfo)
                if (!respuesta) {
                    return this.props.history.push('/serverdown') 
                }else if (respuesta.message) {
                    swal(respuesta.message,"", "error")                
                } else {
                    switch(respuesta){
                        case 'The E-mail is already in use':
                            swal("The E-mail is already in use", "Try another one!", "error")
                            break
                        case 'There was an error in the register.':
                            swal("There was an error in the register.", "Please verify all the required fields are completed.", "error")
                            break
                        default:
                            return swal("Signed Up!", respuesta, "success")
                    }
                }                     
        } else {swal("Passwords doesn't match!", "Please verify and try again.", "error")}
    }  

    
    validate = (e) => {
        const field = e.name
        var message = null
        var expression;
        var invalid = "is-invalid"
        var valid = " is-valid"
        if (e.value.length !== 0) {
            switch(field){
                case 'firstName' :
                    expression= /^[a-z ']{2,14}$/i
                    message= !e.value.match(expression) 
                    break
                case 'lastName':
                    expression= /^[a-z ']{2,14}$/i
                    message= !e.value.match(expression) 
                    break
                case 'email':
                    expression= (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/)
                    message= !e.value.match(expression)   
                    break
                case 'password':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = e.value.length < 6 || !e.value.match(expression)
                    break
                case 'repeatpassword':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = e.value.length < 6 || !e.value.match(expression) || e.value !== this.state.userInfo.password
                    break  
                case 'img':
                    message= e.value.length === 0 || e.value.length <=3
                    break  
                default:
                    return null
            }
        }        
        this.setState({
            ...this.state,
            validator:{...this.state.validator,
                [field]:  message === null ? "" : !message ? valid : invalid}
        })
    }
    
    componentDidMount(){  
        this.toTop()
        this.props.fetchCountries(this.props.history)      
    }    
    responseGoogle = (response) => {
        if (response.error) {
            swal("The Google popup was closed too early!", "Try again!", "error")
        } else{
        const {givenName, email, googleId, imageUrl, familyName} = response.profileObj
        this.send(null, {firstName: givenName, lastName: familyName, email: email, password: "matias"+googleId, repeatpassword: "matias"+googleId, img: imageUrl, country: "null"})
        }
    }

    
    render() {
        return(
            <div>
                <div className="granContenedor">
                    <Header/>
                    <main className= "backgroundSign" style={{backgroundImage: "url('./img/backgroundSign.jpg')"}}>
                        <div className="animate__animated animate__fadeInDown formCard">
                            <h2>Join to our World of Adventures!</h2>
                            <h4>Already have an account?<NavLink exact to="/login"> Log in!</NavLink></h4>
                            <form className="needs-validation">
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                                    <input className={`form-control ${this.state.validator.firstName}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="First Name" name="firstName" value={this.state.userInfo.firstName} onChange={this.readInput} ></input>  
                                </div>                              
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                                    <input className={`form-control ${this.state.validator.lastName}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="Last Name" name="lastName" value={this.state.userInfo.lastName} onChange={this.readInput} ></input>
                                </div>
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope fa-w-16 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
                                    <input className={`form-control ${this.state.validator.email}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="E-Mail" name="email" value={this.state.userInfo.email} onChange={this.readInput} ></input>
                                </div>
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key fa-w-16 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"></path></svg>
                                    <input id="password" autoComplete="off" className={`form-control ${this.state.validator.password}`} onBlur={(e) => this.validate(e.target)} type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChange={this.readInput}></input>                                    
                                    <p className="aclaration">Password must have min. 6 characters and at least 1 letter and 1 number </p>
                                </div>
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="key" className="svg-inline--fa fa-key fa-w-16 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"></path></svg>
                                    <input autoComplete="off" className={`form-control ${this.state.validator.repeatpassword}`} onBlur={(e) => this.validate(e.target)} type="password" placeholder="Repeat Password" name="repeatpassword" value={this.state.userInfo.repeatpassword} onChange={this.readInput}></input>
                                </div>
                                <div>
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="image" className="svg-inline--fa fa-image fa-w-16 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path></svg>
                                    <input className={`form-control ${this.state.validator.img}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="Profile Pic URL link" name="img" value={this.state.userInfo.img} onChange={this.readInput}></input>
                                </div>      
                                <div className="country">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="globe-americas" className="svg-inline--fa fa-globe-americas fa-w-16 iconForm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"></path></svg>
                                    <select className={`form-control ${this.state.validator.country}`} onClickCapture={(e) => this.validate(e.target)} type="select" placeholder="Country" name="country" value={this.state.userInfo.country} onChange={this.readInput}>
                                        <option disabled value="">Choose your Country</option>
                                        {this.props.countries.map((country, index) =>{
                                            return <option key={index}>{country.name}</option>
                                        })}
                                </select>  
                                </div>
                                <div className="submitYGoogle">
                                    <button className="submit" onClick={this.send}>Create Account</button> 
                                    <GoogleLogin
                                        clientId="706728189535-gkdltcou7njsjagcfhn30q0i25g7f30v.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Sign up with Google</button>
                                          )}
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />
                                </div>                                                      
                            </form>
                        </div>
                    </main>
                    <Footer className="footer"/>
                </div>  
            </div>      
        )
    }
}
const mapStateToProps = state => {
    return {
        countries: state.loginReducer.countries,
        userLogged: state.loginReducer.userLogged
    }
}
const mapDispatchToProps = {
    fetchCountries :  loginActions.fetchCountries,
    newUser: loginActions.newUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
