import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import PageLoader from '../Common/PageLoader';
class CurrencyEvaluator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currenciesList: {},
      value: '',
      base: 'USD',
      rateList: {},
      baseCurrencyValue: 1,
      loading: true,
    };

    this.addToCurrencyList = this.addToCurrencyList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlebaseCurrencyValueChange = this.handlebaseCurrencyValueChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addToCurrencyList(event) {
    event.preventDefault();
    if (this.state.value && this.state.rateList[this.state.value]) {
      if (this.state.currenciesList[this.state.value]) {
        toast.warning('Currency Already Exist.');
        return;
      }
      const currenciesList = this.state.currenciesList;
      currenciesList[this.state.value] = this.state.rateList[this.state.value];
      this.setState({
        currenciesList,
        value: '',
      });
    } else {
      toast.warning('Currency does not Exist.');
    }
  }
  removeItem(currencyKey) {
    const currenciesList = this.state.currenciesList;
    delete currenciesList[currencyKey];
    this.setState({ currenciesList });
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  handlebaseCurrencyValueChange(event) {
    this.setState({ baseCurrencyValue: event.target.value });
  }

  componentDidMount() {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
      .then(({ data }) => {
        this.setState({ rateList: data.rates, base: data.base, loading: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false });
      });
  }

  render() {
    return this.state.loading ? (
      <PageLoader />
    ) : (
      <section className="currencyHomeContainer">
        <div className="shopee-logo__blk">
          <img src="shopee_logo.png" alt="shopee" className="img-resposnive" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-6 col-md-offset-4">
              <div className="cur-bg__box">
                <div className="cur-header">
                  {/* <h1 className="textHeader no-marg">
                    <i> {this.state.base} </i>
                  </h1> */}
                  <p className="textStroke__2">
                    {this.state.base}
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.baseCurrencyValue}
                      onChange={this.handlebaseCurrencyValueChange}
                    />
                  </p>
                  <div className="border-bottom__stroke" />
                </div>
                {Object.keys(this.state.currenciesList).map((item, index) => (
                  <div className="curr-parent" key={item}>
                    <div className="curr-desc__box">
                      <p>
                        {item}{' '}
                        <span className="pull-right">
                          {(this.state.currenciesList[item] * this.state.baseCurrencyValue).toFixed(4)}
                        </span>
                      </p>
                      <p>
                        <i>
                          1 {this.state.base} = {this.state.currenciesList[item]} {item}
                        </i>
                      </p>
                    </div>
                    <div className="curr-desc__box curr-flex__boxSecond" onClick={() => this.removeItem(item)}>
                      <i className="glyphicon glyphicon-minus" />
                    </div>
                  </div>
                ))}
                <div className="curr-cta__box text-center">
                  <button className="curr-cta">
                    <i className="glyphicon glyphicon-plus" />
                    <span className="textStroke__3">Add More Currencies</span>
                  </button>
                  <form onSubmit={this.addToCurrencyList}>
                    <div className="input-group marg20">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder="Enter Currencies here"
                      />
                      <span className="input-group-btn">
                        <button type="submit" className="btn curr-cta">
                          Submit
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CurrencyEvaluator;
