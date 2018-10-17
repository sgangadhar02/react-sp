import React, { Component } from 'react';

class CurrencyEvaluator extends Component {
  state = {};

  render() {
    return (
      <section className="currencyHomeContainer">
        <div className="shopee-logo__blk">
          <img src="shopee_logo.png" alt="shopee" className="img-resposnive" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-xs-6 col-md-offset-4">
              <div className="cur-bg__box">
                <div className="cur-header">
                  <h1 className="textHeader no-marg">
                    <i>USD - United States Dollars</i>
                  </h1>
                  <p className="textStroke__2">
                    USD <span className="pull-right">10.00</span>
                  </p>
                  <div className="border-bottom__stroke" />
                </div>

                <div className="curr-parent">
                  <div className="curr-desc__box">
                    <p>
                      EUR <span className="pull-right">8.536</span>
                    </p>
                    <i>EUR - Euro</i>
                    <p>
                      <i>1 USD = EUR 0.853</i>
                    </p>
                  </div>
                  <div className="curr-desc__box curr-flex__boxSecond">
                    <i class="glyphicon glyphicon-minus" />
                  </div>
                </div>

                <div className="curr-cta__box text-center">
                  <button className="curr-cta">
                    <i class="glyphicon glyphicon-plus" />
                    <span className="textStroke__3">Add More Currencies</span>
                  </button>

                  <div className="input-group marg20">
                    <input type="text" className="form-control" placeholder="Enter Currencies here" />
                    <span className="input-group-btn">
                      <button className="btn curr-cta">Submit</button>
                    </span>
                  </div>
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
