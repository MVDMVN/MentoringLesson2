import React from 'react';

function UserCard(props) {
  return (
    <li className="users__item">
      <div className="users__item-name">{props.name}</div>
      <div className="users__item-email">{props.email}</div>
    </li>
  );
}

export default UserCard;
