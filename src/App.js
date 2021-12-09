import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './component/SearchPage';
;

function App() {

  return (
    <Router>
      <Routes>
        <Route path = '/' exact element = {<SearchPage/>}/>
      </Routes>
    </Router>

  );
}

export default App;
