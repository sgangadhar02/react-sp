import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { axiosInterceptor } from './inits/axios';

import PageLoader from './components/Common/PageLoader';

axiosInterceptor();

class App extends Component {
  state = {
    loading: true,
  };

  render() {
    if (this.state.loading) {
      return <PageLoader />;
    }
    return (
      <div>
        
      </div>
    );
  }
}

export default App;
