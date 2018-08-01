import React from 'react';
import * as SadFace from '../Images/sadFace.png';

const NoMatch = () => (
  <div>
    <h1>404:</h1>
    <h3>Page not found</h3>
    <br />
    <img src={SadFace} alt='sad face' />
  </div>
);

export default NoMatch;
