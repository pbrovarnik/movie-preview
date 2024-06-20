import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';

import { store } from './easy-peasy/store';

import Layout from './pages/layout';
import ErrorPage from './pages/error';
import MovieSuggestionsPage from './pages/movie-suggestions.component';
import MovieDetailsPage from './pages/movie-details.component';

import './style/main.scss';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route index element={<MovieSuggestionsPage />} />
			<Route path="/preview/:movieId" element={<MovieDetailsPage />} />
		</Route>
	),
	{
		basename: import.meta.env.BASE_URL,
	}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<StoreProvider store={store}>
			<RouterProvider router={router} />
		</StoreProvider>
	</StrictMode>
);
