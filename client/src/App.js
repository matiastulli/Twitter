import Homepage from "./components/homepage/homepage"
import Register from "./components/register/register"
import {
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom";
import { useState } from 'react';
function App() {
  const [user, setLoginUser] = useState({

  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/">
            {
              user && user._id ? <Homepage /> : <Login />
            }<Homepage /></Route>
          <Route path="/api/user/register"><Register /></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;