import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {unregister} from './registerServiceWorker';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './ducks/store';
import TextEditor from './components/TextEditor/TextEditor';
import Contact from './components/Contact/Contact';
import SignUp from './components/SignUp/SignUp';
import Subscription from './components/Subscription/Subscription';
import LandingFeatures from './components/LandingFeatures/LandingFeatures';

import {StripeProvider} from 'react-stripe-elements';


ReactDOM.render(
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUB_KEY}> 
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
            
           <Route path="/contact" render={(props) => (
               <div>
                  <App {...props}/>
                    <Contact/>
                </div>
           )
           }/>

           <Route path="/signup" render={(props) => (
        
               <SignUp {...props}/>
        
           )}/>

            <Route path="/texteditor" component={TextEditor} />
            

            <Route path="/subscription" render={(props) => (
                <div>
                    <App/>
                    <Subscription {...props}/>
                </div>
            )}/>
       </Switch>
    </Router>
</Provider>
</StripeProvider>

, document.getElementById('root'));
unregister()
