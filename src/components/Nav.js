import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li><NavLink activeClassName='active' exact to='/'>Home</NavLink></li>
        <li><NavLink activeClassName='active' to='/add'>New Question</NavLink></li>
        <li><NavLink activeClassName='active' to='/leaderboard'>Leaderboard</NavLink></li>
      </ul>
    </nav>
  );
}
