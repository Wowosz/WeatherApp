import React from 'react';
import './App.css';
import WeatherForWeekend from "./components/weatherForWeek/WeatherForWeek";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {coordinatesGet: false};
    this.getLocation = this.getLocation.bind(this);
  }
render(){
  if(this.state.coordinatesGet === false){
  return(
    <div>
      <form>
        <input placeholder="What is your city ?"></input>
        <button onClick={this.getLocation}>Show Weather</button>
      </form>
    </div>
  );} else {
    return (
        <WeatherForWeekend coordinates={this.state.coordinatesGet}/>
    );
  }
}
async getLocation(e){
  e.preventDefault();
  const city = e.target.previousSibling.value;
  const respond = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=667c803211d34a14b743d242ed805eb8`);
  const data = await respond.json();
  const coordinates = data.results[0].geometry;
  this.setState({coordinatesGet: coordinates});
}
}

export default App;
