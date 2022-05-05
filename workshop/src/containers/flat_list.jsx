import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Flat from "../containers/flat";

import { setFlats } from "../actions";


// 1: When the flatlist loads the 1st time, we trigger the action SET_FLATS
class FlatList extends Component {

  // 2: If we comment it out, the list would be empty since we don't have any action triggered.
  componentWillMount() {
    this.props.setFlats();
    // 3: If we set a timeout, the console.log appears 3sec after since the action is triggered.
    // setTimeout(() => this.props.setFlats(), 3000);
  }
  // 4: We can now see with the Redux logger which action is triggered.
  // it doesn't change the behavior of the app.

  // We got here
  // - previous state: {flats: Array(6), selectedFlat: null}
  // - action: {type: 'SELECT_FLAT', payload: {…}}
  // - next state: {flats: Array(6), selectedFlat: {…}}
  render() {
    return (
      <div className="flat-list col-sm-7">
        {this.props.flats.map((flat, index) => {
          return <Flat key={flat.name} flat={flat} tabIndex={index} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flats: state.flats
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFlats }, dispatch);
}

// export default FlatList;
export default connect(mapStateToProps, mapDispatchToProps)(FlatList);
