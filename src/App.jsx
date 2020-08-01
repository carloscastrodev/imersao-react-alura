import React from 'react';
import Home from './pages/Home';
import NewVideo from './pages/NewVideo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Page404 from './pages/Page404';
import Manage from './pages/Manage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/newvideo" component={NewVideo} />
          <Route path="/manage" component={Manage} />
          <Route path="*" component={Page404} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
