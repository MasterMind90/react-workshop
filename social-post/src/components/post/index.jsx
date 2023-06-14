import "./style.css";
import React, { useState, useRef } from "react";

const Post = ({ post, onLikeClick, onChangeCommentText, addComment }) => {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <div className="post-container">
        <div className="post-header">
          <img className="post-avatar" src={post.profile} alt="Avatar" />
          <div>
            <div className="post-author">{post.author}</div>
            <div className="post-date">{post.date}</div>
          </div>
        </div>
        <div className="post-content">{post.content}</div>
        <div className="post-image-container">
          <img className="post-image" src={post.image} alt="Post" />
        </div>
        <div class="post-actions">
          <div>
            <div
              onClick={() => {
                //alert("write function to increase the Like ");
                onLikeClick(post.id);
              }}
              // onClick={onLikeClick}
            >
              Like : {post.like}
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setShowComments(!showComments);
              }}
            >
              {showComments
                ? `Hide Comments : ${post.comments.length}`
                : `Show Comments : ${post.comments.length}`}
              {/* Comment : {post.comment} */}
            </div>
          </div>
        </div>
      </div>

      <div className="post-container comments-post">
        {showComments
          ? post.comments.map((comment) => {
              return (
                <div className="display-comments">
                  <div>
                    <img
                      className="post-avatar"
                      src={post.profile}
                      alt="Avatar"
                    />
                  </div>
                  <div className="comment-form">
                    <h4>{comment}</h4>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      <div className="post-container comment-post">
        <div>
          <img className="post-avatar" src={post.profile} alt="Avatar" />
        </div>
        <div className="comment-form">
          <input
            className="comment-input"
            type="text"
            placeholder="Write a comment..."
            onChange={onChangeCommentText}
          />
          <button
            className="comment-button"
            type="button"
            onClick={() => {
              addComment(post.id);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
