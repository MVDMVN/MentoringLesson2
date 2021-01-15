import React from 'react';

function CardItems(props) {
  return (
    <div className="card">
      <img src={props.image} className="card-img-top"  />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
}

export default CardItems;
