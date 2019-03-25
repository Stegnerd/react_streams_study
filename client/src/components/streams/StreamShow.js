import { connect } from "react-redux";
import flv from "flv.js";
import React from "react";

import { fetchStream } from "../../actions";
class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    // this is how you get access to dom elements that aren't jsx elements
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  // if component did rerender try to show player/ blocks null on refresh
  componentDidUpdate() {
    this.buildPlayer();
  }

  // will clean up when you leave the page
  componentWillUnmount() {
    if (this.player || !this.props.stream) {
      return;
    }
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`
    });

    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
