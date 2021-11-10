import { useSelector } from 'react-redux'
import './App.css';
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Productscreen from './screens/Productscreen';
import Cartscreen from './screens/Cartscreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import OrdersScreen from './screens/OrdersScreen';
import Orderinfo from './screens/Orderinfo';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';

function App() {

  const userState = useSelector(state => state.loginReducer)

  let isAdminLoggedIn;
  if (userState.currentUser === null) {
    isAdminLoggedIn = false
  } else {
    if (userState.currentUser.isAdmin === 'true') {
      isAdminLoggedIn = true
    }
  }

  let userLoggedIn;
  if (localStorage.getItem('currentUser')) {
    userLoggedIn = true
  } else {
    userLoggedIn = false
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Homescreen} />
          <Route path="/product/:id" component={Productscreen} />
          {isAdminLoggedIn && <Route path="/admin" component={Adminscreen} />}
          {userLoggedIn ? <Route path="/cart" component={Cartscreen} /> : <Route path="/cart" component={LoginScreen} />}
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          {userLoggedIn ? <Route path="/orders" component={OrdersScreen} /> : <Route path="/cart" component={LoginScreen} />}
          {userLoggedIn ? <Route path="/orderinfo/:orderid" component={Orderinfo} /> : <Route path="/cart" component={LoginScreen} />}
          {userLoggedIn ? <Route path="/profile" component={Profilescreen} /> : <Route path="/cart" component={LoginScreen} />}
          <Route path="*" component={Homescreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
