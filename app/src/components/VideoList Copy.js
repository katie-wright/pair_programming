import React, {Component} from 'react';
import {Link} from 'react-router';
const YouTubeIframeLoader = require('youtube-iframe') ;

class VideoList extends Component {

    render(){
        let vlist = this.props.videos.map((video,i)=>{
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