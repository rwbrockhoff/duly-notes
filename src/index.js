import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';
import TextEditor from './components/TextEditor/TextEditor';
import Contact from './components/Contact/Contact';
import Plan from './components/Plan/Plan';
import LandingFeatures from './components/LandingFeatures/LandingFeatures';

ReactDOM.render(
<Provider store={store}>
    <Router>
        <Switch>
            <Route exact path="/" render={() => (
               <div>
                <App/>
                <LandingFeatures/>
               
                </div>
            )
            }/>

           <Route path="/contact" render={() => (
               <div>
                  <App/>
                    <Contact/>
                </div>
           )
           }/>

            <Route path="/texteditor" component={TextEditor}/>
            <Route path="/plan" component={Plan}/>
       </Switch>
    </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
