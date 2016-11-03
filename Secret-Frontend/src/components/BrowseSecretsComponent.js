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
      secrets: [],
      currenteditedsecretcomments: [],
      ispostingcomment: false,
      commenttext: '',
      currenteditedsecret: ''
    };
    this.getTrendingSecrets = this
      .getTrendingSecrets
      .bind(this);
    this.likeDislikeSecret = this
      .likeDislikeSecret
      .bind(this);
    this.commentOnSecret = this
      .commentOnSecret
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.postComment = this
      .postComment
      .bind(this);

    this.cancelComment = this
      .cancelComment
      .bind(this);
  }

  handleChange(event) {
    this.setState({commenttext: event.target.value});
  }

  likeDislikeSecret(e, id, type) {
    e.preventDefault();
    axios
      .post('http://127.0.0.1:8080/likeDislikeSecret', {
        id: id,
        type: type
      })
      .then(function (response) {
        var secrets = this
          .state
          .secrets
          .slice();
        var secrets = secrets.map(function (item) {
          if (item._id === id) {
            return response.data;
          } else {
            return item;
          }
        });
        this.setState({secrets: secrets});
      }.bind(this))
      .catch(function () {
        sweetalert('Error', 'There was an error while liking the secret. Please try again later.', 'error');
      }.bind(this));
  }

  cancelComment() {
    this.setState({isloading: false, ispostingcomment: false});
  }

  commentOnSecret(e, id) {
    e.preventDefault();
    this.setState({ispostingcomment: true, currenteditedsecret: id});
    this
      .state
      .secrets
      .forEach(function (item) {
        if (item._id === id) {
          this.setState({currenteditedsecretcomments: item.comments});
        }
      }.bind(this));
  }

  postComment() {
    var id = this.state.currenteditedsecret;
    this.setState({isloading: true});
    axios
      .post('http://127.0.0.1:8080/postComment', {
        id: id,
        comment: this.state.commenttext
      })
      .then(function (response) {
        var secrets = this
          .state
          .secrets
          .slice();
        var secrets = secrets.map(function (item) {
          if (item._id === id) {
            return response.data;
          } else {
            return item;
          }
        });
        this.setState({secrets: secrets, ispostingcomment: false, commenttext: '', currenteditedsecret: '', isloading: false});
      }.bind(this));
  }

  getTrendingSecrets() {
    axios
      .get('http://127.0.0.1:8080/trending')
      .then(function (response) {
        this.setState({isloading: false, secrets: response.data});
      }.bind(this))
      .catch(function () {
        this.setState({isloading: false, secrets: []});
        sweetalert('Error', 'There was an error while getting the secrets. Please try again later.', 'error');
      }.bind(this));
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
                          <div className="col-md-4 right-button-border">
                            <div className="row">
                              <div className="col-md-4"></div>
                              <div className="col-md-4 text-left">
                                <span className="like-count count-wrapper text-center">{item.likes}</span>
                                <a href="#" onClick={(e) => this.likeDislikeSecret(e, item._id, 1)}>Like</a>
                              </div>
                              <div className="col-md-4"></div>
                            </div>
                          </div>
                          <div className="col-md-4 right-button-border">
                            <div className="row">
                              <div className="col-md-4"></div>
                              <div className="col-md-4 text-left">
                                <span className="dislike-count count-wrapper text-center">{item.dislikes}</span>
                                <a href="#" onClick={(e) => this.likeDislikeSecret(e, item._id, 0)}>Dislike</a>
                              </div>
                              <div className="col-md-4"></div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="row">
                              <div className="col-md-4"></div>
                              <div className="col-md-5 text-left">
                                <span className="comments-count count-wrapper text-center">{item.comments.length}</span>
                                <a href="#" onClick={(e) => this.commentOnSecret(e, item._id)}>Comment</a>
                              </div>
                              <div className="col-md-3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }.bind(this))}
        </div>
        <div
          className={'comment-post-modal ' + (this.state.ispostingcomment === true
          ? 'visible'
          : 'hidden')}>
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    rows="5"
                    id="comment-text"
                    value={this.state.commenttext}
                    placeholder="Comment"
                    onChange={this.handleChange}></textarea>
                </div>
              </div>
              <div className="row"><br/></div>
              <div className="row">
                <div className="col-md-3">
                  <button className="btn btn-primary" onClick={this.postComment}>Post</button>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary" onClick={this.cancelComment}>Cancel</button>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="comments-container">
                <div className="col-md-12">
                  <h4>Comments ({this.state.currenteditedsecretcomments.length})</h4>
                </div>
                {this
                  .state
                  .currenteditedsecretcomments
                  .map(function (item) {
                    return (
                      <div className="col-md-12 comment-text">{item}</div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BrowseSecretsComponent.displayName = 'BrowseSecretsComponent';

// Uncomment properties you need BrowseSecretsComponent.propTypes = {};
// BrowseSecretsComponent.defaultProps = {};

export default BrowseSecretsComponent;
