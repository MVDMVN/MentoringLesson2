import './App.scss';
import food from "./food.json";

import CardItem from "./components/CardItem";

function App() {
  return (
    <div className="app">
      <div className="app-container">
        {food.map((item) => (
          <CardItem title={item.title} description={item.description} image={item.image} />
        ))}
      </div>
    </div>
  );
}

export default App;
