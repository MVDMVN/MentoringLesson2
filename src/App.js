import React from "react";
import axios from "axios";
import "./App.scss";

import UserCard from "./components/UserCard";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  const [userInfo, setUserInfo] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [apiPage, setApiPage] = React.useState(1);
  const [isAllUsersDownloaded, setAllUsersDownloaded] = React.useState(false);

  function getApiUrl(apiPage) {
    return (
      "https://5c3755177820ff0014d92711.mockapi.io/users?page=" +
      apiPage +
      "&limit=10"
    );
  }

  function addApiPageNumber() {
    setApiPage(apiPage + 1);
  }

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(getApiUrl(apiPage))
      .then((response) => {
        if (!response.data.length) {
          setAllUsersDownloaded(true);
        } else {
          setUserInfo(userInfo.concat(response.data));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [apiPage]);

  return (
    <div className="app">
      <div className="app-container">
        <input
          type="text"
          placeholder="Поиск пользователя..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <ul className="users">
          {userInfo
            .filter(
              (info) =>
                info.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                info.email.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((user) => (
              <UserCard key={user.id} name={user.name} email={user.email} />
            ))}
        </ul>
        {!isAllUsersDownloaded && (
          <button onClick={addApiPageNumber}>
            {isLoading ? "Waiting..." : "Next 10 Users"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
