import { Reset } from 'styled-reset';
import Header from './Header';
import QuestionsPage from './QuestionsPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AskPage from './AskPage';
import GlobalStyles from './GlobalStyles';

function App() {
  return (
    <div>
      <Reset />
      <GlobalStyles />      
      <Router>
        <Header />
        <Switch>
          <Route path="/ask" component = {AskPage} />
          <Route path="/" component = {QuestionsPage} />
        </Switch>      
      </Router>
      
    </div>
  );
}

export default App;
