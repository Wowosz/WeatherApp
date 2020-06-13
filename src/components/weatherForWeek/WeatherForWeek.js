import React from "react";
import {BrowserRouter as Router,
Switch,
Route, Link} from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import { browserHistory } from 'react-router';

class WeatherForWeek extends React.Component {
  constructor(props){
    super(props);
    this.state = {loaded: false};
    this.renderDayCards = this.renderDayCards.bind(this);
    this.timeConverter = this.timeConverter.bind(this);
  }

  async componentDidMount(){
    try {
    console.log(this.props.coordinates);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}&
      exclude=current,hourly,daily&units=metric&appid=89583af17af5fb9d82b59ee4a2a7708a`);
    if(!response.ok){
      throw Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
    this.setState({data: data, loaded: true});
    setTimeout(() => {this.renderDayCards();}, 2000);
    } catch(e) {
      console.log(e);
    }
  }

  render(){
    if(this.state.loaded === false){
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    } else {
    return(
      <div>
        <Router>
          <div>
            <ul>
                {this.renderDayCards()}
            </ul>
          </div>
        </Router>
        </div>
        /*
        <Switch>
          <Route path="/monday">
            {this.state.days[Monday]}
          </Route>

          <Route path="/tuesday">
            {this.state.days[Tuesday]}
          </Route>

          <Route path="/wednesday">
            {this.state.days[Wednesday]}
          </Route>

          <Route path="/thursday">
            {this.state.days[Thursday]}
          </Route>

          <Route path="/friday">
            {this.state.days[Friday]}
          </Route>

          <Route path="/saturday">
            {this.state.days[Saturday]}
          </Route>

          <Route path="/sunday">
            {this.state.days[Sunday]}
          </Route>

        </Switch>
      </div>
      */
    );  
  }
  }
  renderDayCards(){
    let endString = "";
    let resultArray = []
    let daysInWeek = {0: "Sunday", 1: "Monday", 2: "Tuesdat", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday"}
    for(let i = 0; i < 7; i++){
      let day = new Date(this.timeConverter(this.state.data.daily[i].dt)).getDay();
      endString = `
            <p>${daysInWeek[day]}</p>
            <img src="http://openweathermap.org/img/wn/${this.state.data.daily[i].weather[0].icon}@2x.png"/>
            <p>${this.state.data.daily[i].temp.min}°C-${this.state.data.daily[i].temp.max}°C</p>
      `;
      resultArray.push(<li><Link to={`/${daysInWeek[day].toLowerCase()}`}>{ReactHtmlParser(endString)}</Link></li>);
    }
  return resultArray;
  }
  timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
}
export default WeatherForWeek;