'use strict';

import React from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import sweetalert from 'sweetalert';

require('styles//BrowseSecrets.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('sweetalert/dist/sweetalert.css');

class BrowseSecretsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      secrets: []
    };
    this.getTrendingSecrets = this
      .getTrendingSecrets
      .bind(this);
  }
  getTrendingSecrets() {
    axios
      .get('http://localhost:8080/trending')
      .then(function (response) {
        this.setState({isloading: false, secrets: response.data});
      }.bind(this))
      .catch(function (response) {
        this.setState({isloading: false, secrets: []});
        sweetalert("Error", "There was an error while getting the secrets. Please try again later.", "error");
      }.bind(this));;
  }
  componentDidMount() {
    this.getTrendingSecrets();
  }
  render() {
    return (
      <div className="app-body">
        <NavbarComponent active={2}/>
        <div className="container"></div>
      </div>
    );
  }
}

BrowseSecretsComponent.displayName = 'BrowseSecretsComponent';

// Uncomment properties you need BrowseSecretsComponent.propTypes = {};
// BrowseSecretsComponent.defaultProps = {};

export default BrowseSecretsComponent;
