import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CreateTournForm from './components/CreateTournForm/CreateTournForm.jsx'
import Bracket from './components/Bracket/Bracket.jsx'
import Home from './views/Home.jsx'
import NotFound from './views/NotFound.jsx'
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';

import styles from './App.module.css'

function App() {
  const [tournData, setTournData] = useState({})
  const tournExists = tournData.hasOwnProperty('name');

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Header showTournLink={tournExists} />
        <main>
          <Switch>
            <Route path='/tournament' exact>
              <Bracket />
            </Route>
            <Route path='/new' exact>
              <CreateTournForm setTournData={setTournData} />
            </Route>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/*'>
              <NotFound />
            </Route>
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
