import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import immutableTransform from 'redux-persist-transform-immutable';

import rootReducer from './src/reducers';
import { AppWithNavigationState, navigationMiddleware } from './src/navigators/AppNavigator';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  blacklist: ['nav', 'player', 'audiobook'],
};
let middleware = [thunk, navigationMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, logger];
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
