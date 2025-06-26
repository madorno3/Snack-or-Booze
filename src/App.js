import React, {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
// import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./FoodMenu";
// import Snack from "./FoodItem";
import Details from "./Details";
import ChosenItem from "./ChosenItem";
import NewItem from "./NewItem";


function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    newItem: "",
    type: ""
  });

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/add-item">
              <NewItem 
                items={items}
                setItems={setItems}
                formData={formData}
                setFormData={setFormData} 
                />
            </Route>
            <Route path="/:type/:item">
              <ChosenItem />
            </Route>
            <Route path="/:type">
              <Details items={items} setItems={setItems} />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
