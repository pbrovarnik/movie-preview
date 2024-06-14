import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Hero from './hero/hero.component';
import MovieSuggestionsPage from '../pages/movie-suggestions.component';
import MovieDetailsPage from '../pages/movie-details.component';
import ErrorPage from '../pages/error';
// import Footer from './footer/footer.component';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route index element={<MovieSuggestionsPage />} />
			{/* <Route path="/preview/:movieId" element={<MovieDetailsPage />} /> */}
		</Route>
	),
	{
		basename: '/movie-preview',
	}
);

function App() {
	return (
		<div className="app">
			{/* <Hero /> */}
			<RouterProvider router={router} />
			{/* <Footer /> */}
		</div>
	);
}

export default App;
