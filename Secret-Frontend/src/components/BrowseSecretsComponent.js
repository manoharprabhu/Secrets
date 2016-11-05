'use strict';

import React from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';
import sweetalert from 'sweetalert';
import SecretComponent from './SecretComponent';

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
    this.getSecrets = this
      .getSecrets
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

  getSecrets() {
    var url;
    if (this.props.type === 0) {
      url = 'http://127.0.0.1:8080/trending';
    } else {
      url = 'http://127.0.0.1:8080/secret';
    }
    axios
      .get(url)
      .then(function (response) {
        if (this.props.type === 0) {
          this.setState({isloading: false, secrets: response.data});
        } else {
          this.setState({
            isloading: false,
            secrets: [response.data]
          });
        }
      }.bind(this))
      .catch(function () {
        this.setState({isloading: false, secrets: []});
        sweetalert('Error', 'There was an error while getting the secrets. Please try again later.', 'error');
      }.bind(this));
  }
  componentDidMount() {
    this.getSecrets();
  }
  render() {
    return (
      <div className="app-body">
        <NavbarComponent active={this.props.navbarActive}/>
        <div className="container">
          {this.state.secrets.length === 0
            ? <div className="row col-md-12">
                <div className="panel panel-body text-center">
                  <h3>No Secrets</h3>
                </div>
              </div>
            : <span></span>}

          {this
            .state
            .secrets
            .map(function (item) {
              return (<SecretComponent
                id={item._id}
                key={item._id}
                secret={item.secret}
                likes={item.likes}
                dislikes={item.dislikes}
                comments={item.comments}
                likeActionHandler={this
                .likeDislikeSecret
                .bind(this)}
                dislikeActionHandler={this
                .likeDislikeSecret
                .bind(this)}
                commentActionHandler={this
                .commentOnSecret
                .bind(this)}/>);
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

// Uncomment properties you need
BrowseSecretsComponent.propTypes = {
  type: React.PropTypes.number,
  navbarActive: React.PropTypes.number
};
BrowseSecretsComponent.defaultProps = {
  type: 0,
  navbarActive: 2
};

export default BrowseSecretsComponent;
