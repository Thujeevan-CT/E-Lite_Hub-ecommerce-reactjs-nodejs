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

function App() {

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
          {userLoggedIn ? <Route path="/cart" component={Cartscreen} /> : <Route path="/cart" component={LoginScreen} />}
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/orders" component={OrdersScreen} />
          <Route path="/orderinfo/:orderid" component={Orderinfo} />
          <Route path="*" component={Homescreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
