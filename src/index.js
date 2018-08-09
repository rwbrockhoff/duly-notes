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
import Subscription from './components/Subscription/Subscription';
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
            <Route path="/plan" render={(props) => (
                <div>
                    <App/>
                        <Plan {...props}/>
                </div>
            )}/>

            <Route path="/subscription" render={(props) => (
                <div>
                    <App/>
                    <Subscription {...props}/>
                </div>
            )}/>
       </Switch>
    </Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
