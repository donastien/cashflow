import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteMonth } from '../../actions/dashboard';
import MonthExpense from './MonthExpense';
import MonthLoad from './MonthLoad';

const MonthItem = ({
  month: { _id, date, balance, pay, extra, expenses },
  load: { loads },
  deleteMonth,
  tabExp,
  tabLoad,
  tabFromLoad,
  tabToLoad,
}) => {
  // Compteur Expense
  tabExp = expenses.map((expense) => expense.howMuch);
  var sumExp = 0;
  for (var i = 0; i < tabExp.length; i++) {
    sumExp += tabExp[i];
  }

  // Compteur Load
  tabLoad = loads.map((load) => load.howMuch);
  tabFromLoad = loads.map((load) => load.from);
  tabToLoad = loads.map((load) => load.to);
  var sumLoad = 0;

  for (var j = 0; j < tabLoad.length; j++) {
    if (
      (date >= tabFromLoad[j] && date <= tabToLoad[j]) ||
      (date >= tabFromLoad[j] && !tabToLoad[j])
    ) {
      sumLoad += tabLoad[j];
    }
  }

  return (
    <div className='container text-light mt-4'>
      <div className='row justify-content-end'>
        <div className='col-sm-10'>
          <h5 className='text-center text-uppercase h3'>
            <Moment format='MMMM YYYY'>{date}</Moment>
          </h5>
          <div className='card bg-cardmonth'>
            <h5 className='text-right m-2'>
              <i
                onClick={() => deleteMonth(_id)}
                className='fas fa-times'
                type='button'
              ></i>
            </h5>
            <div className='card-title'>
              <div className='row'>
                <div className='col-sm'>
                  <div className='card-text text-center h5'>
                    Expenses:
                    <h4>{sumExp}</h4>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='h5 card-text text-center'>
                    Paycheck: <h4>{pay}</h4>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='card-text text-center h5'>
                    Balance: <h4>{balance + pay + extra - sumExp - sumLoad}</h4>
                  </div>
                </div>
                <div className='col-sm'>
                  <div className='h5 card-text text-center'>
                    Extra: <h4>{extra}</h4>
                  </div>
                </div>

                <div className='col-sm'>
                  <div className='card-text text-center h5'>
                    Loads:
                    <h4>{sumLoad}</h4>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm mt-4 text-center'>
                  <p>
                    <button
                      className='btn btn-danger'
                      data-toggle='collapse'
                      data-target={'#exp' + _id}
                      type='button'
                      aria-expanded='false'
                      aria-controls={'exp' + _id}
                    >
                      Show Expenses <i className='fas fa-angle-down ml-2'></i>
                    </button>
                  </p>
                </div>

                <div className='col-sm mt-4 text-center'>
                  <Link to={`/add-expense/${_id}`} className='btn btn-light'>
                    <i className='fas fa-cart-plus'></i> Add Expense
                  </Link>
                </div>
                <div className='col-sm mt-4 text-center'>
                  <a href={`/edit-month/${_id}`} className='btn btn-light'>
                    <i className='fas fa-wrench'></i> Update Month
                  </a>
                </div>
                <div className='col-sm mt-4 text-center'>
                  <p>
                    <button
                      className='btn btn-danger'
                      data-toggle='collapse'
                      data-target={'#loads' + _id}
                      type='button'
                      aria-expanded='false'
                      aria-controls={'loads' + _id}
                    >
                      Show Loads <i className='fas fa-angle-down ml-2'></i>
                    </button>
                  </p>
                </div>
              </div>
              <div className='collapse m-1' id={'loads' + _id}>
                <div className='card collexp card-body bg-dark'>
                  {loads && loads.length > 0 ? (
                    <Fragment>
                      {loads.map((load) => (
                        <MonthLoad
                          key={load._id}
                          load={load}
                          monthDate={date}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4> No Loads...</h4>
                  )}
                </div>
              </div>
              <div className='collapse m-1' id={'exp' + _id}>
                <div className='card collexp card-body bg-dark'>
                  {expenses && expenses.length > 0 ? (
                    <Fragment>
                      {expenses.map((expense) => (
                        <MonthExpense
                          key={expense._id}
                          expense={expense}
                          monthId={_id}
                        />
                      ))}
                    </Fragment>
                  ) : (
                    <h4>No expense...</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MonthItem.propTypes = {
  month: PropTypes.object.isRequired,
  deleteMonth: PropTypes.func.isRequired,
  load: PropTypes.object.isRequired,
  tabFromLoad: PropTypes.array.isRequired,
  tabLoad: PropTypes.array.isRequired,
  tabToLoad: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  months: state.dashboard,
  load: state.load,
});

export default connect(mapStateToProps, { deleteMonth })(MonthItem);
