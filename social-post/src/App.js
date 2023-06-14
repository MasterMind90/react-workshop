import logo from "./logo.svg";
import "./App.css";
import Post from "./components/post";
import { useState } from "react";
import Posts from "./Data/PostList";

function App() {
  const [posts, setPosts] = useState(Posts);
  const [postText, setPostText] = useState("");
  const [commentText, setCommentText] = useState("");
  const onLikeClick = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id == id) {
          post.like = post.like + 1;
        }
        return post;
      })
    );
  };
  const addPost = () => {
    const cur = {
      id: Math.floor(Math.random() * 1000),
      author: "John Doe",
      date: "June 11, 2023",
      content: postText,
      profile: "profile-picture.png",
      image: "placeholder.svg",
      like: 0,
      comment: 0,
      comments: [],
    };
    setPosts([cur, ...posts]);
    setPostText("");
  };
  console.log(commentText);
  const addComment = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id == id) {
          post.comments.push(commentText);
        }
        return post;
      })
    );
  };
  return (
    <div className="App">
      <input
        style={{
          padding: "10px",
          width: "50%",
        }}
        placeholder="Write your post..."
        type="text"
        onChange={(e) => setPostText(e.target.value)}
      />
      <button
        style={{
          marginTop: "5px",
          width: "50%",
          padding: "10px",
        }}
        onClick={addPost}
      >
        Post
      </button>
      {posts.map((post) => {
        return (
          <Post
            post={post}
            onLikeClick={onLikeClick}
            addComment={addComment}
            onChangeCommentText={(e) => setCommentText(e.target.value)}
          />
        );
      })}
    </div>
  );
}

export default App;
