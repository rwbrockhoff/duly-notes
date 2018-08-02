import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';
import TextEditor from './components/TextEditor/TextEditor';
import Pricing from './components/Pricing/Pricing';
import LandingFeatures from './components/LandingFeatures/LandingFeatures';

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" render={() => (
               <div>
                <App/>
                <LandingFeatures/>
                <Pricing/>
                </div>
            )
            }/>


           
            <Route path="/texteditor" component={TextEditor}/>
       </Switch>
    </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
