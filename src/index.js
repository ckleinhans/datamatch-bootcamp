import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase';

import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyDwaSvVJX7tnkkMRYIXLddAyElhucxJiRw",
  authDomain: "test-19285.firebaseapp.com",
  databaseURL: "https://test-19285.firebaseio.com",
  projectId: "test-19285",
  storageBucket: "test-19285.appspot.com",
  messagingSenderId: "224514562365",
  appId: "1:224514562365:web:9c170932903613e8c38d54"
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools())

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  preserveOnLogout: ['names'],
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
