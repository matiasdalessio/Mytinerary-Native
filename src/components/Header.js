import { connect } from 'react-redux'
import {NavLink, Link} from 'react-router-dom'
import HeaderSm from "../components/HeaderSm"
import loginActions from '../redux/actions/loginActions'
import swal from 'sweetalert'

const Header = (props) =>{ 

    const logOut=(()=> {
        swal({
            title: "Are you sure that you want to Log Out?",
            text: "You can Log in again, anyway",
            icon: "warning",
            buttons: ["No Way!", "I'm Sure!"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                props.removeUserInfo()
                swal("Okay then, see you later!", {
                    icon: "success",
              });
            } else {
              swal("Okay! Let's keep looking!");
            }
          });
    })

    const imagen = props.userLogged ? props.userLogged.img : "/img/generic-user-icon.jpg"

    return(
        <header className= "header">
            <div className= "logo animate__animated animate__fadeInLeft"style={{backgroundImage: `url('/img/LOGO.png')`}}>
            </div>  
            <div className="animate__animated animate__fadeInRight headerDer"> 
                <div className="navbar">
                    <NavLink className="nav-link" exact to="/">Home</NavLink>
                    <NavLink className="nav-link" exact to="/cities">Cities</NavLink>   
                </div>   
                <HeaderSm className="headerSmall"/>    
                <ul className="nav-item">
                    <div className="welcomeAndAvatar">
                        <button style={{backgroundImage: `url("${imagen}")`}} className="nav-link genericUser" data-bs-toggle="dropdown" ></button>
                        {props.userLogged 
                        ?<ul className="dropdown-menu">
                            <li className="dropdown-item" onClick={(e)=>logOut(e.target)} >Log Out</li>
                        </ul> 
                        :<ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/login">Log In</Link></li>
                            <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                        </ul>}
                        <h6 className="welcome">{props.userLogged ? `${props.userLogged.firstName}`: null}</h6>
                    </div>
                </ul>
            </div>
        </header>        
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.loginReducer.userLogged
    }
}
const mapDispatchToProps = {
    removeUserInfo :  loginActions.removeUserInfo,
  
}



export default connect(mapStateToProps, mapDispatchToProps)(Header)
