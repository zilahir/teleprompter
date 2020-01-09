/*eslint-disable*/
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

const store = configureStore()

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            default: '#3A3A3A'
        }
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
