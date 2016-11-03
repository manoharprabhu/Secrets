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
    this.likeSecret = this
      .likeSecret
      .bind(this);
    this.dislikeSecret = this
      .dislikeSecret
      .bind(this);
    this.commentOnSecret = this
      .commentOnSecret
      .bind(this);
  }
  likeSecret(id) {
    alert(id);
  }

  dislikeSecret(id) {}

  commentOnSecret(id) {}

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
        <div className="container">
          {this
            .state
            .secrets
            .map(function (item) {
              return (
                <div className="row" key={item._id}>
                  <div className="col-md-12">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        {item.secret}
                      </div>
                      <div className="panel-footer">
                        <div className="row">
                          <div className="col-md-4 text-center like-text right-button-border">(<span>{item.likes}</span>)
                            <a
                              href="#"
                              onClick={this
                              .likeSecret
                              .bind(this, item._id)}>
                              Like</a>
                          </div>
                          <div className="col-md-4 text-center dislike-text right-button-border">(<span>{item.dislikes}</span>)
                            <a
                              href="#"
                              onClick={this
                              .dislikeSecret
                              .bind(this, item._id)}>
                              Dislike</a>
                          </div>
                          <div className="col-md-4 text-center comments-text">(<span>{item.comments.length}</span>)
                            <a
                              href="#"
                              onClick={this
                              .commentOnSecret
                              .bind(this, item._id)}>
                              Comment</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }.bind(this))}
        </div>
      </div>
    );
  }
}

BrowseSecretsComponent.displayName = 'BrowseSecretsComponent';

// Uncomment properties you need BrowseSecretsComponent.propTypes = {};
// BrowseSecretsComponent.defaultProps = {};

export default BrowseSecretsComponent;
