import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import VideoList from './components/VideoList';



class App extends Component {
  constructor(){
    super();
    this.state = {
      videos: [],
      category: ""
    };
  }
  componentWillMount(){
    const promise = axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
                  'key': 'AIzaSyC5lJIkV7lPWS9p_gC3LB50Yy8fQOrKjuY',
                  'chart': 'mostPopular',
                 'regionCode': 'US',
                 'part': 'snippet,contentDetails,statistics',
                 'videoCategoryId': ''}
    });
    promise.then(result=>{
      console.log("Success!");
      console.log(result);
      this.setState({
        videos: result.data.items
      })
    });
    promise.catch(error=>{
      console.log(error);
    });
  }
  render() {
    return (
      <div className="App">
        <VideoList videos={this.state.videos} />
      </div>
    );
  }
}

export default App;
