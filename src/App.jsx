import { useState } from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

import GithubLink from './components/BasicElements/GithubLink.jsx';
import CreateForm from './components/CreateForm/CreateForm.jsx';
import Bracket from './components/Bracket/Bracket.jsx';
import Home from './views/Home.jsx';
import NotFound from './views/NotFound.jsx';

function App() {
  const [tournData, setTournData] = useState({})

  return (
    <div className='App flex flex-col'>
      <BrowserRouter>
        <header>
          <nav className='shadow-slate-700 shadow-lg border-b border-slate-800 mb-4'>
            <NavLink to='/' exact>Home</NavLink>
            <NavLink to='/new' exact>New Tournament</NavLink>
            {tournData.hasOwnProperty('name') ? <NavLink to='/tourne' exact>Your Tournament</NavLink> : <></>}
          </nav>
        </header>
        <main className='flex flex-grow flex-col justify-center items-center'>
          <Switch>
            <Route path='/tourne' exact>
              <Bracket />
            </Route>
            <Route path='/new' exact>
              <CreateForm setTournData={setTournData} />
            </Route>
            <Route path='/' exact>
              <Home />
            </Route>
            <Route path='/*'>
              <NotFound />
            </Route>
          </Switch>
        </main>
        <footer className='bg-slate-700 text-right px-4 py-1 text-slate-400 text-sm flex flex-row-reverse gap-2'>
          <GithubLink />
          Made by Dylan Floyd 
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
