import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <div>
        <br />
        <h2>About pingr.club</h2>
        <p>
          Pingr.club is a completely cross platform lightweight messaging app.
          Send messages to yourself and pick them up on any device anywhere. Add
          you friends by their username and you can send messages to them too.
        </p>
        <p>
          You can pick up your messages on any internet capable device. Use our
          browser app to send a message and pick it up on your phone with our
          Android or iPhone app.
        </p>
        <p>
          All messages are stored remotely, so there is no wasted space on your
          devices. Messages are encrypted and stored for thirty days and then
          automatically deleted, no need to worry about cleaning up the
          distracting clutter of old messages.
        </p>
      </div>
    );
  }
}

export default About;
