import React, { Component } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { AppContext } from "../Context/AppContext";
import { FaUserCircle } from 'react-icons/fa';


class Navbar extends Component {
  static contextType = AppContext;

  state = {
    clicked: false,
  };

  ClickHandler = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { flagSignUp, firstname, flagLogin } = this.context;

    return (
      <>
        <nav>

          <a href="/home">
            <img
              src="/secondLogo.jpg" 
              alt="Logo"
              style={{
                objectFit: 'contain',

                borderRadius: '50%',
                width: '69px',
                height: '69px',
              }}
            />
          </a>

          <div>
            <ul id="navbar" className={this.state.clicked ? "active" : ""}>
              <li>
                <NavLink to='/Home' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/About' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                >
                  About
                </NavLink>
              </li>
              {flagLogin && (
                <li>
                  <NavLink to='/Login' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                  >
                    Login
                  </NavLink>
                </li>
              )}
              {!flagLogin && (
                <li>
                  <NavLink to='/Logout' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
              {flagSignUp && (
                <li>
                  <NavLink to='/Signup' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                  >
                    SignUp
                  </NavLink>
                </li>
              )}
              {!flagSignUp && (
                <li>
                  <NavLink to='/AccountProfile' className={({ isActive }) => (isActive ? 'active' : '')} onClick={() => this.setState({ clicked: false })}
                  >
                    <FaUserCircle className="inline mr-1 mb-1" /> {firstname}
                  </NavLink>
                </li>
              )}

            </ul>
          </div>

          <div id="mobile" onClick={this.ClickHandler}>
            <i id='bar' className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
