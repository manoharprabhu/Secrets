require('normalize.css/normalize.css');
require('styles/App.css');
require('bootstrap/dist/css/bootstrap.min.css');

import React from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: ''
    };

    this.handleChange = this
      .handleChange
      .bind(this);

    this.postSecret = this
      .postSecret
      .bind(this);
  }

  handleChange(event) {
    this.setState({secret: event.target.value});
  }

  postSecret() {
    axios
      .post('/newsecret', {'secret': this.state.secret})
      .then(function (response) {
        console.log(response);
      });
  }
  render() {
    return (
      <div className="app-body">
        <NavbarComponent active={1}/>
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="post-panel panel panel-primary panel-default">
                <div className="panel-heading">Your secret is safe with me.</div>
                <div className="panel-body">
                  <p className="text-center">Share your secrets with the world anonymously.</p>
                  <div className="row col-md-12">
                    <textarea
                      className="form-control"
                      rows="5"
                      id="secret-text"
                      value={this.state.secret}
                      placeholder="Secret goes here"
                      onChange={this.handleChange}></textarea>
                  </div>
                  <div className="row col-md-12"><br/></div>
                  <div className="row col-md-12">
                    <button
                      type="button"
                      id="secret-post"
                      className="btn btn-primary"
                      onClick={this.postSecret}>Post</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
