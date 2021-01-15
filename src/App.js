import React from 'react';
import axios from 'axios';
import './App.scss';

import UserCard from './components/UserCard'

function App() {
  function getApiUrl(apiPage) {
    return 'https://5c3755177820ff0014d92711.mockapi.io/users?page=' + apiPage + '&limit=10';
  }

  const [searchValue, setSearchValue] = React.useState('');
  const [userInfo, setUserInfo] = React.useState([]);
  const [running, setRunning] = React.useState(false);
  const [apiPage, setApiPage] = React.useState(1);
  const [isAllUsersDownloaded, setAllUsersDownloaded] = React.useState(false);

  React.useEffect(() => {
    axios.get(getApiUrl(apiPage)).then((response) => {
      setUserInfo(response.data);
    });
  }, []);

  React.useEffect(() => {
    setApiPage(apiPage + 1);
    axios.get(getApiUrl(apiPage)).then((response) => {
      if(response.data.length < 1) {
        setAllUsersDownloaded(true);
      }
      let newUserInfo = userInfo.concat(response.data);
      setUserInfo(newUserInfo);
    })
    .finally(() => {
      setRunning(false);
    })
  }, [running]);

  const toggleRunning = () => {
    setRunning(true);
  }
  return (
    <div className="app">
      <div className="app-container">
        <input type="text" placeholder="Поиск пользователя..." value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
          <ul className="users">
            { userInfo
              .filter((info) => info.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              info.email.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((user, index) =>
                <UserCard key={index} name={user.name} email={user.email} />
              )}
          </ul>
        {
          !isAllUsersDownloaded ? (
            <button onClick={toggleRunning}>{running ? 'Waiting...' : 'Add' +
              ' User'}</button>
          ) : ('')
        }
      </div>
    </div>
  );
}

export default App;
