import React, { Component } from 'react';

export default class Counter extends Component {

  render() {
    const {
      countSessions,
      countBreaks,
      highlightSessionCounter,
      highlightBreakCounter
    } = this.props; 

    return (
        <div id="timer-btns-row" className="buttons">
          <div
            className={(highlightBreakCounter) ?
              "counter counter-active" :
              "counter"}
            id="break-count"
          >
            {countBreaks}
          </div>
          <div
            className={(highlightSessionCounter) ?
              "counter counter-active" :
              "counter"}
            id="session-count"
          >
            {countSessions}
          </div>
          <audio id="beep"/>
        </div>
    )
  }
}