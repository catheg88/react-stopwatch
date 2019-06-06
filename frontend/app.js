var React = require('react')
var ReactDOM = require('react-dom')

class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = { time: Date.now()}
  }

  componentDidMount(){
    const interval = setInterval(()=>{
      this.setState({ time: Date.now()})
    })
  }

  componentWillUnmount(){
    clearInterval(interval)
  }

  render(){
    let display
      if (this.props.running) {
        display = this.state.time - this.props.timeStart
      } else {
        display = this.props.timeStop - this.props.timeStart
      }
      display = display / 1000

    return(
      <div>{display}</div>
    )
  }
}

class StartButton extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.clickStart()
  }

  render(){
    const buttonName = this.props.running ? "Lap" : "Start"
    return(
      <button className="button" type="button" onClick={this.handleClick}>{buttonName}</button>
    )
  }
}

class StopButton extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.clickStop()
  }

  render(){
    const buttonName = this.props.running ? "Stop" : "Reset"
    return(
      <button className="button" type="button" onClick={this.handleClick}>{buttonName}</button>
    )
  }
}

class LapDisplay extends React.Component {
  render(){
    const laps = this.props.laps.map( (lap, idx) => {
      return (<div key={idx}>{lap}</div>)
    })
    return <div>{laps}</div>
  }
}

class Stopwatch extends React.Component {
  constructor(props){
    super(props)
    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleClickStop = this.handleClickStop.bind(this)
    this.state = {
      running: false,
      timeStart: null,
      timeStop: null,
      lap: []
    }
  }

  handleClickStart(){
    if (this.state.running){  // lap
      lapArr = this.state.lap.slice()
      lapArr.push( (Date.now() - this.state.timeStart) / 1000)
      this.setState({ lap: lapArr })
    } else { // start
      this.setState({
        running: true,
        timeStart: Date.now()
      })
    }
    if (this.state.timeStart && !this.state.running) { // restart
      let currentElapsed = this.state.timeStop - this.state.timeStart
      this.setState({ timeStart: Date.now() - currentElapsed})
    }
  }

  handleClickStop(){
    if (this.state.running) { // stop
      this.setState({
        running: false,
        timeStop: Date.now()
      })
    } else { // reset
      this.setState({
        timeStart: null,
        timeStop: null,
        lap: [],
      })
    }
  }

  render() {
    return(
      <div>
        <Timer
          timeStart={this.state.timeStart}
          timeStop={this.state.timeStop}
          running={this.state.running}
        />
        <StartButton
            running={this.state.running}
            clickStart={this.handleClickStart}
        />
        <StopButton
            running={this.state.running}
            clickStop={this.handleClickStop}
        />
        <LapDisplay laps={this.state.lap} />
      </div>
    )
  }
}

ReactDOM.render(
  <Stopwatch/>,
  document.getElementById("root")
)
