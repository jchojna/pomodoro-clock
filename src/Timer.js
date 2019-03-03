import React, { Component } from 'react';

export default class Timer extends Component {

  render() {
    const {
      activePhase,
      breakActivated,
      minutes,
      seconds,
      handleStartStopClick,
      countingPhase,
      handleResetClick,
      setBeepRef,
    } = this.props; 

    return (
      <div id="timer-label">
        <div
          id="timer-length"
          className={(countingPhase==="STOP") ?
          "circle-label circle-label-active" :
          "circle-label"}>
            <h2 className="text">{activePhase}</h2>
            <div
              id="time-left"
              className={(breakActivated) ? "number timer-break-active" : "number"}
              >
              {minutes}:{seconds}
            </div>
        </div>
        <div id="timer-btns-row" className="buttons">
          <button
            className="button"
            id="start_stop"
            onClick={handleStartStopClick}
          > {countingPhase}
          </button>

          <button
            className="button"
            id="reset"
            onClick={handleResetClick}
          > RESET
          </button>
          
          <audio id="beep" ref={setBeepRef} />
        </div>
      </div>
    )
  }
}