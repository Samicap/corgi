import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Child({ childId }) {
  //*child id is just a number
  //*childMessages is an array of objects
  const [childProfile, setChildProfile] = useState(null);

  const [userId, setUserId] = useState(window.localStorage.getItem("childId"));

  useEffect(() => {
    if (childId) {
      setUserId(childId);
      window.localStorage.setItem("childId", childId);
    } else {
      setUserId(window.localStorage.getItem("childId"));
    }
  }, [childId]);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/profiles/child/${userId}`).then((response) => {
        // returns an object of arrays of message objects (containing message and animal info)
        const childData = response.data.childs[0];
        setChildProfile(childData);
      });
    }
  }, [userId]);

  //! this useEffect is run everythime the component mounts.Meaning it runs the axios call again to update the childProfile. By leaving the [] empty in the end of the useEffect we are telling it to only run once when the component mounts. this is what we want because the childId and profile stay the same on this page as they are the logged in user and this is their inbox.  If we put the childProfile in the [childProfile] then the useEffect would call the axios request everytime the state change

  return (
    <>
      <div class="card">
        {childProfile && (
          <>
            <img src={childProfile.avatar_url} />
            <img class="card-img-top" src={childProfile.child_avatar_url} />
            <p class="card-body">
              {childProfile.username}, {childProfile.age}
            </p>
            <p class="card-body">{childProfile.location}</p>
            <Link class="NewMess" to="/outbox">
              Create A New Message!
            </Link>
          </>
        )}
      </div>{" "}
    </>
  );
}
