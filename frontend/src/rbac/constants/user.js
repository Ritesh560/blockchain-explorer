import Home from '../../pages/Home/Home';
import Login from '../../pages/LoginSignup/Login';
import Signup from '../../pages/LoginSignup/Signup';

const USER_ROUTES = [
  {
    link: '/',
    name: 'home',
    component: <Home />
  },
  {
    link: '/login',
    name: 'login',
    component: <Login />
  },
  {
    link: '/signup',
    name: 'signup',
    component: <Signup />
  }
];

export default USER_ROUTES;
