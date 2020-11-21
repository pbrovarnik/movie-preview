import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, StoreProvider } from 'easy-peasy';

import model from './model';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import './style/main.scss';

const store = createStore(model);

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();