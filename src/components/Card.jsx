import React from "react";
import "./styles.css";
export default function Card(prosp) {
    const {posts}=prosp
  return (
    <div className="card-component">
      <b>{posts.title}</b>
      <p>{posts.body}</p>
    </div>
  );
}
