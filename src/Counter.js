import React, { Component } from 'react';

export default class Counter extends Component {

  render() {
    const {
      counter
    } = this.props; 

    let hrs = Math.floor(counter/3600);
    let min = Math.floor(counter/60)%60;
    let sec = counter%60;

    if (sec < 10) sec = "0" + sec;
    if (min < 10) min = "0" + min;
    if (hrs < 10) hrs = "0" + hrs;

    return (
        <div id="score-length" className="circle-label">
          <h2 className="text">Total</h2>
          <div
            id="total-time"
            className="number"
            >
            {`${hrs}:${min}:${sec}`}
          </div>
        </div>
    )
  }
}