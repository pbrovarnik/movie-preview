import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import Hero from './hero/hero.component';
import MovieDetailsPage from '../pages/movie-details.component';
import MoviePreviewSuggestions from '../pages/movie-preview-suggestions.component';

function App() {
	return (
		<>
			<BrowserRouter>
				<Hero />
				<Switch>
					<Route exact path='/' component={MoviePreviewSuggestions} />
					<Route exact path='/preview' component={MovieDetailsPage} />
					<Redirect to='/' />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
