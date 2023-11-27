import './App.css';
import CityTab from './components/CityTab/CityTab';
import Map from './pages/Map/Map';

export default function App() {
const newURL = '/new-page';
window.history.replaceState({}, '', newURL);

  function resetUrl() {
    window.history.replaceState({}, '/new-page', '');
  }

  function updateUrl() {

  }


  return (
    <div className="App">
      <Map/>
      <CityTab/>
    </div>
  );
}