import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

// components
import DashboardLayout from "./layout/DashboardLayout";
import ErrorPage from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IntroModal from "./components/UI/IntroModal";
import User from "./pages/User";

const App = () => {


  return (
    <>


      <DashboardLayout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>

          <Route path="/user" component={User}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/404" component={ErrorPage} />

          <Route path="*" component={ErrorPage} />
        </Switch>
      </DashboardLayout>
    </>
  );
};

export default App;
