import { Route, Routes } from 'react-router-dom';
import { TopBar } from './TopBar.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ConfusionMatrix } from './pages/ConfusionMatrix.tsx';

function App() {
  return (
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confusion" element={<ConfusionMatrix />} />
      </Routes>
    </div>
  );
}

export default App;
