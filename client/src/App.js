import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/guesthouses" element={<List/>}/>
        <Route path="/guesthouses/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
