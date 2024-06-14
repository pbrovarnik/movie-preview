import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer.component';
import Hero from '../components/hero/hero.component';

function Layout() {
	return (
		<div className="layout">
			<Hero />
			<main className="main-content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
