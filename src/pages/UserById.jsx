import React, { useEffect, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
export default function UserById() {
  const navigate = useNavigate();
  const {
    state: { data },
  } = useLocation();
  const [posts, setPosts] = useState(null);
  const [worldTime, setWorldTime] = useState('');
  const [country, setCountry] = useState(null);
  const [selectCountry, setSelectCountry] = useState("Africa/Abidjan");
  const [formattedTime, setFormattedTime] = useState('');
  
  // const timestamp = "2023-11-29T19:29:51.937894+00:00";
  // const date = new Date(worldTime?.utc_datetime);

  // const timestamp = "2023-11-29T19:29:51.937894+00:00";

  setTimeout(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    };
    const currentTime = getCurrentTime();
    setFormattedTime(currentTime)
  }, 1000);

  // -----api calling------
  const fetchPosts = async () => {
    try {
      const result = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!result.ok) {
        console.log("error");
      }
      const data = await result.json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTime = async () => {
    try {
      const result = await fetch(
        `http://worldtimeapi.org/api/timezone/${selectCountry}`
      );
      if (!result.ok) {
        console.log("error");
      }
      const data = await result.json();
      setWorldTime(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountry = async () => {
    try {
      const result = await fetch("http://worldtimeapi.org/api/timezone");
      if (!result.ok) {
        console.log("error");
      }
      const data = await result.json();
      setCountry(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCountry();
  }, []);
  useEffect(() => {
    fetchTime();
  }, [selectCountry]);

  return (
    <div>
      <div className="userlist">
        <div className="user--header-div">
          <div>
            <button onClick={() => navigate("/")}>Back</button>
          </div>
          <div className="left-div">
            <div className="country--dropdown">
              <label for="country">Country:</label>
              <select
                name="country"
                id="country"
                onChange={(e) => setSelectCountry(e.target.value)}
              >
                {country?.map((items) => (
                  <option value={items}>{items}</option>
                ))}
              </select>
            </div>
            <div className="time">
              <p>{formattedTime}</p>
            </div>
            <div>
              <button>Pause / Start</button>
            </div>
          </div>
        </div>
        <h1 className="user--title">User Detalis</h1>
        <div className="user--detalis">
          <div>
            <p>Name : {data?.name}</p>
            <p>Username | Catch phares : {data?.username}</p>
          </div>
          <div>
            <p>Address : {data?.website}</p>
            <p>Email | phone : {data?.email} </p>
          </div>
        </div>
        <br />
        <div className="card--collection">
          <div className="grid-container">
            <div className="minicard">
              {posts?.map((items) => (
                <Card posts={items} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
