import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { axiosInterceptor } from './inits/axios';

import PageLoader from './components/Common/PageLoader';
import CurrencyEvaluator from "./components/CurrencyEvaluator";

axiosInterceptor();

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      loading: false
    }))
  }

  render() {
    if (this.state.loading) {
      return <PageLoader />;
    }
    return (
      <div>
        <CurrencyEvaluator />
      </div>
    );
  }
}

export default App;
