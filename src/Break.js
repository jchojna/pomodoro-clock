import React, { Component } from 'react';

export default class BreakSession extends Component {
  hanlde2Click = () => this.props.handleClick("break-decrement")

  render() {
    const {
      handleClick,
      disabled,
      breakLength,
      breakActivated,
      countingPhase
    } = this.props;

    return (
      <div id="break-label">
        <div
          id="break-length"
          className={(breakActivated && countingPhase==="STOP") ?
          "circle-label circle-label-active" :
          "circle-label"}>
            <h2 className="text">Break Length</h2>
            <div className="number">{breakLength}</div>
        </div>

        <div id="break-btns" className="buttons">
          <button
            class="button"
            id="break-decrement"
            onClick={this.hanlde2Click}
            disabled={disabled}
            >
            <i class="fa fa-arrow-down"></i>
          </button>
          <button
            class="button"
            id="break-increment"
            onClick={() => handleClick("break-increment")}
            disabled={disabled}
            >
            <i class="fa fa-arrow-up"></i>
          </button>
        </div>
      </div>
    )
  }
}