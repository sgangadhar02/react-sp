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
      showCurrencyInput: false,
    };

    this.addToCurrencyList = this.addToCurrencyList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlebaseCurrencyValueChange = this.handlebaseCurrencyValueChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.showCurrencyInput = this.showCurrencyInput.bind(this);
  }

  addToCurrencyList(event) {
    event.preventDefault();
    const { value, rateList, currenciesList } = this.state;
    if (value && rateList[value]) {
      if (currenciesList[value]) {
        toast.warning('Currency already exist in the list.');
        return;
      }
      const clonedCurrenciesList = Object.assign({}, currenciesList);
      clonedCurrenciesList[value] = rateList[value];
      this.setState({ currenciesList: clonedCurrenciesList, value: '' });
    } else {
      toast.warning('Currency does not exist in the list.');
    }
  }
  removeItem(currencyKey) {
    const { currenciesList } = this.state;
    delete currenciesList[currencyKey];
    this.setState({ currenciesList });
  }

  handleChange(event) {
    this.setState({ value: event.target.value.toUpperCase() });
  }

  showCurrencyInput() {
    const { showCurrencyInput } = this.state;
    this.setState({ showCurrencyInput: !showCurrencyInput });
  }

  handlebaseCurrencyValueChange(event) {
    this.setState({ baseCurrencyValue: event.target.value });
  }

  componentDidMount() {
    const { base } = this.state;
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${base}`)
      .then(({ data }) => {
        this.setState({ rateList: data.rates, base: data.base, loading: false });
      })
      .catch(e => {
        console.log(e);
        this.setState({ loading: false });
      });
  }

  render() {
    const { base, baseCurrencyValue, currenciesList, value, loading, showCurrencyInput } = this.state;
    return loading ? (
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
                  <p className="textStroke__2">
                    {base}
                    <input
                      type="number"
                      className="form-control"
                      value={baseCurrencyValue}
                      onChange={this.handlebaseCurrencyValueChange}
                    />
                  </p>
                  <div className="border-bottom__stroke" />
                </div>
                {Object.keys(currenciesList).map((item, index) => (
                  <div className="curr-parent" key={item}>
                    <div className="curr-desc__box">
                      <p>
                        {item}{' '}
                        <span className="pull-right">{(currenciesList[item] * baseCurrencyValue).toFixed(4)}</span>
                      </p>
                      <p>
                        <i>
                          1 {base} = {currenciesList[item]} {item}
                        </i>
                      </p>
                    </div>
                    <div className="curr-desc__box curr-flex__boxSecond" onClick={() => this.removeItem(item)}>
                      <i className="glyphicon glyphicon-minus" />
                    </div>
                  </div>
                ))}
                <div className="curr-cta__box text-center">
                  {showCurrencyInput ? (
                    <form onSubmit={this.addToCurrencyList}>
                      <div className="input-group marg20">
                        <input
                          type="text"
                          className="form-control"
                          value={value}
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
                  ) : (
                    <button className="curr-cta" onClick={this.showCurrencyInput}>
                      <i className="glyphicon glyphicon-plus" />
                      <span className="textStroke__3">Add More Currencies</span>
                    </button>
                  )}
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
