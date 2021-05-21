import React from "react";
import { connect } from "react-redux";
import {NavLink} from 'react-router-dom'

function HeaderSm(props) {
  
  const positionUser = props.userLogged ? "nav-link responsiveNav withWelcome": "nav-link responsiveNav "

  return ( 
      <ul className="animate__animated animate__fadeInLeft nav-item">
            <button style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/img/burger.png'})`}} className={positionUser} data-bs-toggle="dropdown" ></button>
            <ul className="dropdown-menu responsiveDropdown">
                <li><NavLink className="dropdown-item " exact to="/">Home</NavLink></li>
                <li><NavLink className="dropdown-item " exact to="/Cities">Cities</NavLink></li>
            </ul>
      </ul> 
  );
}

const mapStateToProps = state => {
  return {
      userLogged: state.loginReducer.userLogged
  }
}



export default connect(mapStateToProps)(HeaderSm)