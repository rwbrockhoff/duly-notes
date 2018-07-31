import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import TextEditor from './components/TextEditor/TextEditor';

ReactDOM.render(

    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/texteditor" component={TextEditor}/>
       </Switch>
    </Router>

, document.getElementById('root'));
registerServiceWorker();
