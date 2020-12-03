import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, StoreProvider } from 'easy-peasy';

import model from './model';
import App from './components/App';

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
