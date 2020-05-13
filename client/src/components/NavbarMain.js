import React from 'react'
import { Link } from 'react-router-dom';

const NavbarMain = props => {
  return (
    <div className='navbarMain'>
    <div className='navleft'>
      <div className="logo">
        <img src="https://i.ibb.co/wpQGhGG/Conosole-log-logo.png"/>
      </div>
    </div>
    <div className="navRight">
    <div className="courses">
        <div>
          <Link to='/'>Web Dev</Link>
        </div>
        <div>
          <Link to='/'>UX/UI</Link>
        </div>
        <div>
          <Link to='/'>Data</Link>
        </div>
      </div>
      </div>
    </div>
  )
}


export default NavbarMain;