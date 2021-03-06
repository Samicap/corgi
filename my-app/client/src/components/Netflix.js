import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Netflix({ users, onSelectChild }) {
  const [selectedChild, setSelectedChild] = useState(null);
  const [childArray, setChildArray] = useState([]);
  const getSelectedChild = (childId) => {
    setSelectedChild(childId);
    onSelectChild(childId);
  };
  useEffect(() => {
    if (users) {
      setChildArray(users);
      window.localStorage.setItem("childArray", JSON.stringify(users));
    } else {
      setChildArray(JSON.parse(window.localStorage.getItem("childArray")));
    }
  }, []);
  return (
    <div class="wrapper">
      <h1 class="netTitle"> CHOOSE PROFILE </h1>
      <ul class="netflix">
        {childArray.map((user) => {
          return (
            <div class="profile-wrap">
              <div class="profile">
                <li
                  class="netLi"
                  key={user.childs_id}
                  onClick={() => getSelectedChild(user.childs_id)}
                >
                  <img scr={user.childs_avatar_url} />
                  <Link
                    class="netLink"
                    to={{ pathname: `/inbox/children/${user.childs_id}` }}
                  >
                    <img class="netAv" src={user.childs_avatar_url} />
                    {user.childs_username}
                  </Link>
                </li>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

{
  /* <img src={user.childs_avatar_url} />; */
}
