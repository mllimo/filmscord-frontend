import Header from '../static/Header';
import LoginBox from '../auth/LoginBox';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const FilmscordRouter = () => {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<LoginBox />} />
          <Route path="/signup" element={<LoginBox />} />
        </Routes>
    </Router>
  );
}

export default FilmscordRouter;