'use strict';

import React from 'react';

require('styles//Secret.css');

class SecretComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row" key={this.props.id}>
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              {this.props.secret}
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-md-4 right-button-border">
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-left">
                      <span className="like-count count-wrapper text-center">{this.props.likes}</span>
                      <a href="#" onClick={(e) => this.props.likeActionHandler(e, this.props.id, 1)}>Like</a>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
                <div className="col-md-4 right-button-border">
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 text-left">
                      <span className="dislike-count count-wrapper text-center">{this.props.dislikes}</span>
                      <a
                        href="#"
                        onClick={(e) => this.props.dislikeActionHandler(e, this.props.id, 0)}>Dislike</a>
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-5 text-left">
                      <span className="comments-count count-wrapper text-center">{this.props.comments.length}</span>
                      <a href="#" onClick={(e) => this.props.commentActionHandler(e, this.props.id)}>Comment</a>
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
  }
}

SecretComponent.displayName = 'SecretComponent';

// Uncomment properties you need
SecretComponent.propTypes = {
  id: React.PropTypes.string,
  secret: React.PropTypes.string,
  likes: React.PropTypes.number,
  dislikes: React.PropTypes.number,
  comments: React.PropTypes.array,
  likeActionHandler: React.PropTypes.func,
  dislikeActionHandler: React.PropTypes.func,
  commentActionHandler: React.PropTypes.func
};
SecretComponent.defaultProps = {
  id: '',
  secret: '',
  likes: 0,
  dislikes: 0,
  comments: [],
  likeActionHandler: function () {},
  dislikeActionHandler: function () {},
  commentActionHandler: function () {}
};

export default SecretComponent;
