import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth.js';
function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/auth' exact component={Auth} />
        </Switch>

      </Container>
    </BrowserRouter>


  );
}

export default App;
