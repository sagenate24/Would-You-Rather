import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Poll
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' activeClassName='active'></NavLink>
        </li>
        <li>
          <NavLink to='/will-not-match'></NavLink>
        </li>
      </ul>
    </nav>
  );
}
