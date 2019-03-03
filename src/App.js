import React, { Component } from "react";
import "./css/App.css";
import Break from "./Break";
import Session from "./Session";
import Timer from "./Timer";
import Counter from "./Counter";
import Counters from "./Counters";
import { sounds } from "./Helpers";

const INT_BREAK_LENGTH = 5;
const INT_SESSION_LENGTH = 25;
const ACTIVE_SESSION = "Session";
const ACTIVE_BREAK = "Break";
const TIME_INTERVAL = 1; // zmienic na 1000

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: INT_BREAK_LENGTH,
      sessionLength: INT_SESSION_LENGTH,
      minutes: INT_SESSION_LENGTH,
      seconds: "00",
      activePhase: ACTIVE_SESSION,
      breakActivated: false,
      sessionActivated: false,
      countingPhase: "START",
      counter: 0,
      countSessions: 0,
      countBreaks: 0,
      highlightSessionCounter: false,
      highlightBreakCounter: false
    };
    this.intervalHandle = false;
    this.beepRef = null;
  }

  setBeepRef = ref => {
    if (ref) {
      this.beepRef = ref;
    }
  };

  changeLengthValue = id => {
    let breakLength = this.state.breakLength;
    let sessionLength = this.state.sessionLength;

    switch (id) {
      case "break-decrement":
        if (breakLength > 1) breakLength--;
        break;
      case "break-increment":
        if (breakLength < 60) breakLength++;
        break;
      case "session-decrement":
        if (sessionLength > 1) sessionLength--;
        break;
      case "session-increment":
        if (sessionLength < 60) sessionLength++;
        break;
      default:
        break;
    }

    this.setState(
      {
        breakLength,
        sessionLength,
        minutes: sessionLength < 10 ? "0" + sessionLength : sessionLength
      },
      () => {
        console.log("wynkonalo");
      }
    );
  };

  reset = () => {
    clearInterval(this.intervalHandle);

    // pogrupowac setStaty
    this.setState({ breakLength: INT_BREAK_LENGTH });
    this.setState({ sessionLength: INT_SESSION_LENGTH });
    this.setState({ minutes: INT_SESSION_LENGTH });
    this.setState({ seconds: "00" });
    this.setState({ countingPhase: "START" });
    this.setState({ activePhase: ACTIVE_SESSION });
    this.setState({ breakActivated: false });
    this.setState({ counter: 0 });
    this.setState({ countBreaks: 0 });
    this.setState({ countSessions: 0 });
    this.setState({ highlightSessionCounter: false });
    this.setState({ highlightBreakCounter: false });

    if (this.beepRef) {
      this.beepRef.pause();
      this.beepRef.currentTime = 0;
    }
  };

  playSound = clipIndex => {
    if (this.beepRef) {
      this.beepRef.src = sounds[clipIndex].src;
      this.beepRef.volume = 0.05;
      this.beepRef.currentTime = 0;
      this.beepRef.play();
    }
  };

  startStop = () => {
    if (this.state.countingPhase === "START") {
      this.intervalHandle = setInterval(() => this.countDown(), TIME_INTERVAL);
      this.setState({ countingPhase: "STOP" });
      // this.playSound(0);
    } else {
      clearInterval(this.intervalHandle);
      this.setState({ countingPhase: "START" });
      // this.playSound(1);
    }
  };

  countDown = () => {
    const {
      minutes,
      seconds,
      breakActivated,
      breakLength,
      sessionLength,
      counter,
      countBreaks,
      countSessions
    } = this.state;

    let min = parseInt(minutes);
    let sec = parseInt(seconds);
    let count = counter;
    let sessionAmount = countSessions;
    let breakAmount = countBreaks;

    // COUNTING DOWN
    if (min > 0 && sec === 0) {
      min--;
      sec = 59;
      count++;
    } else if (min === 0 && sec === 1) {
      // displayed when 00:00
      sec--;
      count++;
      if (!breakActivated) {
        this.setState({ activePhase: ACTIVE_BREAK });
        this.playSound(1);
      } else {
        this.setState({ activePhase: ACTIVE_SESSION });
        this.playSound(0);
      }
    } else if (min === 0 && sec === 0) {
      // displayed 1sec after 00:00
      clearInterval(this.intervalHandle);
      if (!breakActivated) {
        min = breakLength;
        sessionAmount++;
        this.highlightSessionCounter();
        this.intervalHandle = setInterval(
          () => this.countDown(),
          TIME_INTERVAL
        );
        this.setState({ breakActivated: true });
        this.setState({ countSessions: sessionAmount });
      } else {
        min = sessionLength;
        breakAmount++;
        this.highlightBreakCounter();
        this.intervalHandle = setInterval(
          () => this.countDown(),
          TIME_INTERVAL
        );
        this.setState({ breakActivated: false });
        this.setState({ countBreaks: breakAmount });
      }
    } else {
      sec--;
      count++;
    }

    // SET STATE OF MINUTES IN TWO VARIATIONS
    if (min < 10) {
      this.setState({ minutes: "0" + min });
    } else {
      this.setState({ minutes: min });
    }
    // SET STATE OF SECONDS IN TWO VARIATIONS
    if (sec < 10) {
      this.setState({ seconds: "0" + sec });
    } else {
      this.setState({ seconds: sec });
    }
    this.setState({ counter: count });
  };

  highlightSessionCounter = () => {
    this.setState({ highlightSessionCounter: true });
    setTimeout(() => this.setState({ highlightSessionCounter: false }), 500);
  };

  highlightBreakCounter = () => {
    this.setState({ highlightBreakCounter: true });
    setTimeout(() => this.setState({ highlightBreakCounter: false }), 500);
  };

  render() {
    const {
      breakLength,
      countingPhase,
      sessionLength,
      minutes,
      seconds,
      breakActivated,
      activePhase,
      counter,
      countSessions,
      countBreaks,
      highlightSessionCounter,
      highlightBreakCounter
    } = this.state;

    const classN = `title ${counter === 0 ? 'titleZero' : ''}`

    return (
      <div id="container">
        <div id="wrapper">
          <h1 id="title">Pomodoro Clock</h1>
          <div className="row">
            <Break
              breakLength={breakLength}
              sessionLength={sessionLength}
              handleClick={this.changeLengthValue}
              disabled={countingPhase === "STOP"}
              breakActivated={breakActivated}
              countingPhase={countingPhase}
            />
            <Session
              breakLength={breakLength}
              sessionLength={sessionLength}
              handleClick={this.changeLengthValue}
              disabled={countingPhase === "STOP"}
              breakActivated={breakActivated}
              countingPhase={countingPhase}
            />
          </div>
          <div className="row">
            <Timer
              minutes={minutes}
              seconds={seconds}
              breakActivated={breakActivated}
              handleStartStopClick={this.startStop}
              handleResetClick={this.reset}
              countingPhase={countingPhase}
              activePhase={activePhase}
              setBeepRef={this.setBeepRef}
            />
            <div id="score-label">
              <Counter counter={counter} />
              <Counters
                countSessions={countSessions}
                countBreaks={countBreaks}
                highlightSessionCounter={highlightSessionCounter}
                highlightBreakCounter={highlightBreakCounter}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
