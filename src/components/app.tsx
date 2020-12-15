import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import Hero from './hero/hero.component';
import MovieDetailsPage from '../pages/movie-details.component';
import MovieSuggestionsPage from '../pages/movie-suggestions.component';
import Footer from './footer/footer.component';

function App() {
	return (
		<>
			<BrowserRouter>
				<div className='app'>
					<Hero />
					<Switch>
						<Route exact path='/' component={MovieSuggestionsPage} />
						<Route exact path='/preview/:movieId' component={MovieDetailsPage} />
						<Redirect to='/' />
					</Switch>
					<Footer />
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
