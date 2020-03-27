import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { TestsList, TestsInsert, TestsUpdate, Test } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
              <Route path="/tests/list" exact component={TestsList} />
              <Route path="/tests/create" exact component={TestsInsert} />
              <Route path="/tests/update/:id" exact component={TestsUpdate} />
              <Route path="/test/:id" exact component={Test} />
            </Switch>
        </Router>
    )
}

export default App