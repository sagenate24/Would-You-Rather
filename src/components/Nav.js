import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Nav.css';

export default function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li data-uitest={'home'}><NavLink activeClassName='active' exact to='/'>Home</NavLink></li>
        <li data-uitest={'newQuestion'}><NavLink activeClassName='active' to='/add'>New Question</NavLink></li>
        <li data-uitest={'leaderboard'}><NavLink activeClassName='active' to='/leaderboard'>Leaderboard</NavLink></li>
      </ul>
    </nav>
  );
}
