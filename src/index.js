import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from './redux/config/configStore';
import { QueryClient } from "react-query"
import { QueryClientProvider } from "react-query"
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()
// axios.defaults.withcredentials = true;
root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>
);
