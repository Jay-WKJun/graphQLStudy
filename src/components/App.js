import {
  Routes,
  Route,
} from 'react-router';
import { HashRouter as Router } from 'react-router-dom'

import Home from '../routes/Home';
import Detail from '../routes/Detail.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path=":id" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
