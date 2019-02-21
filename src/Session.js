import React, { Component } from 'react';

export default class Session extends Component {

  render() {
    const {
      handleClick,
      disabled,
      sessionLength,
      breakActivated,
      countingPhase
      } = this.props;

    return (
      <div id="session-label">
        <div
          id="session-length"
          className={(!breakActivated && countingPhase==="STOP") ?
          "circle-label circle-label-active" :
          "circle-label"}>
            <h2 className="text">Session Length</h2>
            <div className="number">{sessionLength}</div>
        </div>
      
        <div id="session-btns" className="buttons">
          <button
            className="button"
            id="session-decrement"
            onClick={() => handleClick("session-decrement")}
            disabled={disabled}
            >
            <i class="fa fa-arrow-down"></i>
          </button>
          <button
            className="button"
            id="session-increment"
            onClick={() => handleClick("session-increment")}
            disabled={disabled}
            >
            <i class="fa fa-arrow-up"></i>
          </button>
        </div>
      </div>
    )
  }
}