import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";

// components
import ErrorPage from "./pages/404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Products from "./pages/Products";
import User from "./pages/User";

const PageRoutes = [

  // auth
  {
    path: "/auth",
    component: AuthLayout,
    routes: [
      { path: "/auth/login", component: Login },
      { path: "/auth/register", component: Register },
    ],
  },
  // error
  { path: "*", component: ErrorPage },
];

export default PageRoutes;

/*

Tried this code in the App.js but it didn't work.

///
import PageRoutes from "./routes";
console.log(PageRoutes);

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      // pass the sub-routes to nest
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

///

const App = () => {
  return (
    <Switch>
      {PageRoutes.map((route, idx) => (
        <RouteWithSubRoutes key={idx} {...route} />
      ))}
    </Switch>
  );
};


*/
