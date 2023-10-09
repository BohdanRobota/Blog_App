import { observer } from 'mobx-react-lite';
import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <main className="main-container">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
export default observer(App);
