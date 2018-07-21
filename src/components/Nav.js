import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    // <nav className='nav'>
      <ul>
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/add' >
            New Poll
          </Link>
        </li>
        <li>
          <Link to='/leaderboard'>
            Leaderboard
          </Link>
        </li>
        <li>
          <Link to='/login'></Link>
        </li>
        <li>
          <Link to='/will-not-match'></Link>
        </li>
      </ul>
    // </nav>
  );
}
