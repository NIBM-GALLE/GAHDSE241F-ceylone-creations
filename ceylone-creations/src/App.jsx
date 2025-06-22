// filepath: c:\Users\subat\GAHDSE241F-ceylone-creations\ceylone-creations\src\App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BuyersCrowdFunding from './pages/buyers/BuyersCrowdFunding';
import ArtisantSubmitForm from './pages/artisants/ArtisantSubmitForm';
import HomePage from './pages/elibrary/HomePage';
import TutorialDetailPage from './pages/elibrary/TutorialDetailPage';
import TutorialsView from './pages/tutorials/TutorialsView';
import CrowdFundingRequestForm from './pages/artisants/CrowdFundingRequestForm';  

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
          <Route path="/tutorials" element={<TutorialsView />} />
          <Route path="/requestform" element={<CrowdFundingRequestForm />} />

          
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;