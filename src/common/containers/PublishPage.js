import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import Publish from '../components/Publish';
import * as PublishActions from '../actions/publish';

function mapStateToProps(state) {

    const {
      isFetching,
      bl ,
      error
    } = state

    return {

      isFetching,
      bl ,
      error
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PublishActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Publish);
