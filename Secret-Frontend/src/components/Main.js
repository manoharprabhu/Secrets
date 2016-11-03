require('normalize.css/normalize.css');
require('styles/App.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('sweetalert/dist/sweetalert.css');

import React from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import sweetalert from 'sweetalert';
import ActivityIndicator from 'react-activity-indicator'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      secret: '',
      isloading: false
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
    this.setState({isloading: true});
    var self = this;
    axios
      .post('http://localhost:8080/newsecret', {'secret': this.state.secret})
      .then(function (response) {
        if (response.data && response.data.success === true) {
          this.setState({secret: ''});
          sweetalert("Success", "Your secret has been successfully posted with the ID: " + response.data.id, "success");
        } else {
          sweetalert("Error", "There was an error while posting your secret. Please try again later.", "error");
        }
        this.setState({isloading: false});
      }.bind(this))
      .catch(function (response) {
        this.setState({isloading: false});
        sweetalert("Error", "There was an error while posting your secret. Please try again later.", "error");
      }.bind(this));
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
                <div className="panel-heading text-center">
                  <h3>Share your secrets with the world anonymously</h3>
                </div>
                <div className="panel-body">
                  <div className="row col-md-12">
                    <textarea
                      className="form-control"
                      rows="5"
                      id="secret-text"
                      value={this.state.secret}
                      placeholder="What's on your mind?"
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
          {this.state.isloading === true
            ? (
              <div className="center-modal">
                <ActivityIndicator
                  number={3}
                  diameter={10}
                  borderWidth={1}
                  duration={100}
                  activeColor="#FFFFFF"
                  borderColor="#FFFFFF"
                  borderRadius="50%"/>
              </div>
            )
            : ('')}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
