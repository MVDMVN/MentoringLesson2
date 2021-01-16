import React from "react";
import "./App.scss";
import food from "./food.json";

import CardItem from "./components/CardItem";

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="app">
      <div className="app-container">
        <div className="input-container">
          <input
            type="text"
            className="form-control"
            placeholder="Поиск"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="cards-container">
          {food
            .filter(
              (data) =>
                data.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                data.description
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <CardItem
                key={item.title + "" + item.desc}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
