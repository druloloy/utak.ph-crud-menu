import SideNav from '@organisms/SideNav';
import './App.css';
import Products from './pages/Products';
import Header from '@organisms/Header';

function App() {
	return (
		<section className="w-screen h-auto overflow-hidden bg-gradient-to-b from-secondary-100 to-white to-20%">
			<Header />
			<section className="w-full h-auto flex flex-row gap-4">
				<section className="w-fit z-10">
					<SideNav />
				</section>
				<section className="flex-1 h-screen">
					<Products />
				</section>
			</section>
		</section>
	);
}

export default App;
