import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { axiosInterceptor } from './inits/axios';

import CurrencyEvaluator from './components/CurrencyEvaluator';

axiosInterceptor();

class App extends Component {
  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      loading: false,
    }));
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <CurrencyEvaluator />
      </div>
    );
  }
}

export default App;
