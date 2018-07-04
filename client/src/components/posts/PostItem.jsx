import React from 'react';
import { Link } from 'react-router-dom';
import { func, object } from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { addLike, deletePost, removeLike } from '../../actions/postActions';

const propTypes = {
  addLike: func.isRequired,
  auth: object.isRequired,
  deletePost: func.isRequired,
  post: object.isRequired,
  removeLike: func.isRequired
};

class PostItem extends React.Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnLikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike = likes => {
    const { auth } = this.props;

    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { auth, post, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt={`${post.name}'s avatar`}
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={
                      'fas fa-thumbs-up' +
                      (this.findUserLike(post.likes)
                        ? ' text-info'
                        : ' text-secondary')
                    }
                  />
                  <span className="badge badge-light">
                    {post.likes.length > 0 ? post.likes.length : null}
                  </span>
                </button>
                <button
                  onClick={this.onUnLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn btn-danger mr-1"
                    type="button"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    addLike,
    deletePost,
    removeLike
  }
)(PostItem);
