
import Details from './pages/Details';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import Login from './pages/Login';
import Register from './pages/Register';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Favorites from './pages/Favorites';
import Root from './utils/root';


function App() {
  
  return (
    <Provider store={store}>
    <Router>
            <Root/>
    <Routes>
            <Route  path="/" element=<Home/> />
            <Route path="/details/:id" element=<Details/> />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
    </Routes>
    </Router>
    </Provider>
  )
}

export default App