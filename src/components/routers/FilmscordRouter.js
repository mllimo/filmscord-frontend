import Header from '../static/Header';
import Login from '../auth/Login';
import Register from '../auth/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserScreen from '../screens/UserScreen';

const FilmscordRouter = () => {
  //<UserRoute />
  return (
    <Router>
      <Header />
      <Routes>

        <Route path="/about" element={<h1>TODO</h1>} />

        <Route path="/" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/user/:username" element={
          <PrivateRoute>
            <UserScreen />
          </PrivateRoute>
        }
        />


      </Routes>
    </Router>
  );
}

export default FilmscordRouter;