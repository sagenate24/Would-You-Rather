import React from 'react';
import { connect } from 'react-redux';

const NoMatch = () => (
      <div>
        <h1>404:</h1>
        <h3>Page not found</h3>
      </div>
)

export default connect()(NoMatch);