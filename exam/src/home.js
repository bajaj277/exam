import { NavLink } from "react-router-dom";
// import "../../App.css"
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./NavBar";
import App from "./App";
const Home = () => {
    return ( <div>
        <div style={{ position: "sticky", top: "0", zIndex: "1" }}>
          <Navbar />
        </div>
        <div>
          <Switch>

            <Route path="/app" exact component={App} />
            <Redirect to="/page-not-found" />
          </Switch>
        </div>
    </div> );
}
 
export default Home;