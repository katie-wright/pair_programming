import React, {Component} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
const YouTubeIframeLoader = require('youtube-iframe') ;

class VideoList extends Component {
    constructor(){
        super();
        this.state={
            videos:[]
        }
    }
componentWillMount(){
    const promise = axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
                  'key': 'AIzaSyC5lJIkV7lPWS9p_gC3LB50Yy8fQOrKjuY',
                  'chart': 'mostPopular',
                 'regionCode': 'US',
                 'part': 'snippet,contentDetails,statistics',
                 'videoCategoryId': this.props.params.category}
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
    render(){
        let vlist = this.state.videos.map((video,i)=>{
            return (
                <Video 
                    id={video.id}
                    title={video.snippet.title}
                    description={video.snippet.description}
                    user={video.snippet.channelTitle}
                    views={video.statistics.viewCount}
                    date={video.snippet.publishedAt}
                    tags={video.snippet.tags}
                    category={video.snippet.categoryId}
                    />
            )
        })
        return (
                <div>
                    {vlist}
                </div>
        )
    }
}

class Video extends Component {

    render(){
        let videoId = this.props.id;
        YouTubeIframeLoader.load(function(YT) {
        new YT.Player('player' + videoId, {
          height: '390',
          width: '640',
          videoId: videoId
        });
      });


        return (
                <div>
                    <h1> {this.props.title} </h1>
                    <div id={'player' + videoId}></div>
                    <p>{this.props.description}</p>
                    <p>{this.props.user}<span>{this.props.views}</span></p>
                    <p>{this.props.date}</p>
                    {/* <p>{tagList}</p> */}
                    
                </div>
        )
    }
}

export default VideoList;