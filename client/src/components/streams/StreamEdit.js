import React from "react";
import { connect } from "react-redux";

import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  componentDidMount() {
    // component needs to be responsible for getting its own data
    // this is here in case you directly load to this component
    this.props.fetchStream(this.props.match.params.id);
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    return <div>{this.props.stream.title}</div>;
  }
}

// own props is a reference to props aboce in streamEdit
const mapStateToProps = (state, ownProps) => {
  // console.log(ownProps) to see how we got to .matcg.params.id
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamEdit);
