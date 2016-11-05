'use strict';

import React from 'react';
import BrowseSecretsComponent from './BrowseSecretsComponent';

require('styles//ViewRandomSecret.css');

class ViewRandomSecretComponent extends React.Component {
  render() {
    return (<BrowseSecretsComponent type={1} navbarActive={3}/>);
  }
}

ViewRandomSecretComponent.displayName = 'ViewRandomSecretComponent';

// Uncomment properties you need ViewRandomSecretComponent.propTypes = {};
// ViewRandomSecretComponent.defaultProps = {};

export default ViewRandomSecretComponent;