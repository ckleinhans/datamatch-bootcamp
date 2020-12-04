import React from 'react';
import CardEditor from './CardEditor.js';
import CardViewer from './CardViewer.js';
import Homepage from './Homepage.js';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import User from './User.js';

const App = () => {
  return(
  <Switch>
    <Route exact path="/editor">
      <CardEditor />
    </Route>
    <Route exact path="/viewer/:deckId">
      <CardViewer />
    </Route>
    <Route exact path="/">
      <Homepage />
    </Route>
    <Route path="/user/:name">
      <User />
    </Route>
    <Route>
      <div>Page not found</div>
    </Route>
  </Switch>
  );
};

export default App;
