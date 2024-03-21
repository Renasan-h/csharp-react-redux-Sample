import { Route } from "react-router-dom";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import Layout from "./components/Layout";

import FetchPetsStatus from "./components/PetsStatusList";
import "./custom.css";

export default () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
    <Route
      path="/fetch-pets-status-data/:startDateIndex?"
      component={FetchPetsStatus}
    />
  </Layout>
);
