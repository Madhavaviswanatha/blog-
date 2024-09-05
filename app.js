import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';  // Add this component for displaying posts

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
