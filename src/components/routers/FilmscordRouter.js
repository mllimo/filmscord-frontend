import Header from '../static/Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const FilmscordRouter = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
    </Router>
  );
}

export default FilmscordRouter;