import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';

import { store } from './easy-peasy/store';

import App from './components/app';

import './style/main.scss';

ReactDOM.render(
	<React.StrictMode>
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
