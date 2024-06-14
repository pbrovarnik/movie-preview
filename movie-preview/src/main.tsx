import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'easy-peasy';

import { store } from './easy-peasy/store';

import App from './components/app';

import './style/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StoreProvider store={store}>
			<App />
		</StoreProvider>
	</StrictMode>
);
