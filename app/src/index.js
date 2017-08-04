import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import VideoList from './components/VideoList';

ReactDOM.render(
<Router history={browserHistory}>
    <Route path='/' component={App}>
        <IndexRoute component={VideoList} />
        <Route path='/:category' component={VideoList} />
    </Route>
</Router>

, document.getElementById('root'));
registerServiceWorker();
