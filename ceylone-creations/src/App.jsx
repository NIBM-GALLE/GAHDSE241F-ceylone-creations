// filepath: c:\Users\subat\GAHDSE241F-ceylone-creations\ceylone-creations\src\App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BuyersCrowdFunding from './pages/buyers/BuyersCrowdFunding';
import ArtisantSubmitForm from './pages/artisants/ArtisantSubmitForm';
import HomePage from './pages/elibrary/HomePage';
import TutorialDetailPage from './pages/elibrary/TutorialDetailPage';    

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
    
          <Route path="/buyers" element={<BuyersCrowdFunding />} />
          <Route path="/artisantsform" element={<ArtisantSubmitForm />} />
          <Route path="/elibrary"element={<HomePage />} />
          <Route path="/elibrary"element={<TutorialDetailPage />} />

          
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;