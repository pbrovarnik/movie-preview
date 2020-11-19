import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import MovieComparisonPage from '../pages/movie-comparision.component';
import MovieDetailsPage from '../pages/movie-details.component';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={MovieDetailsPage} />
				<Route path='/compare' component={MovieComparisonPage} />
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
