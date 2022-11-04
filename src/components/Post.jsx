import React, { useState } from "react";
import useFetch from "../helpers/useFetch";

const Post = () => {
  const [id, setId] = useState(1);

  const [show, setShow] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [like, setLike] = useState(false);

  let likeText = like ? "Unlike" : "Like";

  const post = useFetch("https://jsonplaceholder.typicode.com/posts/", id);
  const avatarImg = useFetch(
    "https://jsonplaceholder.typicode.com/photos/",
    id
  );
  const user = useFetch(
    "https://jsonplaceholder.typicode.com/users/",
    post.userId || 1
  );
  const comments = useFetch(
    "https://jsonplaceholder.typicode.com/comments?postId=",
    id
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setCommentList([
        ...commentList,
        {
          postId: id,
          id: Date.now(),
          email: "test@gmail.com",
          body: inputValue,
        },
      ]);
    }
    setInputValue("");
  };

  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 100+1);
    setId(randomNumber);
    setShow(false);
  };

  const seeComments = () => {
    setCommentList(comments);
    setShow(!show);
  };
  const handleLike = () => {
    setLike(!like);
  };

  const handleReaction = (value) => {
    value === "like" ? setLike(true) : setLike(false);
  };

  return (
    <div>
      <div className="reaction">
        <div className="btn-group">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuClickableOutside"
            data-bs-toggle="dropdown"
            data-bs-auto-close="inside"
            aria-expanded="false"
          />
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuClickableOutside"
          >
            <li>
              <a
                onClick={() => handleReaction("like")}
                className="dropdown-item"
                href="#"
              >
                👍
              </a>
            </li>
            <li>
              <a
                onClick={() => handleReaction("dislike")}
                className="dropdown-item"
                href="#"
              >
                👎
              </a>
            </li>
          </ul>
        </div>
      </div>
      <button onClick={() => handleClick()} className="btn btn-info">
        Get Post
      </button>

      <div>
        {avatarImg && (
          <img
            className="rounded-circle"
            src={avatarImg.thumbnailUrl}
            alt="avatarPhoto"
          />
        )}

        {user && (
          <h4>
            {user.name} {"@" + user.username}
          </h4>
        )}

        {post && (
          <h5>
            {post.title}{" "}
            <button onClick={() => handleLike()} className="comment-reaction">
              ❤️{likeText}
            </button>
          </h5>
        )}

        <button onClick={seeComments} className="btn btn-secondary">
          💬
        </button>
        {show && (
          <div>
            <ul className="list-group">
              {commentList.map((comment) => (
                <li className="list-group-item" key={comment.id}>
                  {comment.body}
                </li>
              ))}
            </ul>
            <div className="input">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add comment"
                  aria-label="Add comment"
                  aria-describedby="basic-addon2"
                  value={inputValue}
                  onChange={handleChange}
                />
                <div className="input-group-append">
                  <button
                    onClick={handleSubmit}
                    className="btn btn-outline-secondary"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
