import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import MovieDetailsPage from '../pages/movie-details.component';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={MovieDetailsPage} />
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
