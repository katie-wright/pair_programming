import React, {Component} from 'react';
// import {Link} from 'react-router';
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
                <div className = 'vlist'>
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
          height: '360',
          width: '600',
          videoId: videoId
        });
      });


        return (
                <div className='row'>

                <div className='col-md-8'>
                    <div className="panel panel-primary">
                    <div className="panel-heading"><h2 > {this.props.title} </h2></div>
                    <div className="panel-body" >
                        <div id={'player' + videoId}>
                        </div>

                    <div className="panel-footer">
                        <h4>User: {this.props.user}</h4>
                        <h4>Views: {this.props.views}</h4>
                        <p>Date: {this.props.date}</p>
                    </div>

                        <button type="button" className="btn btn-info btn-video" data-toggle="collapse" data-target={"#v" + videoId}>View/Hide Description</button>
                        <div id={"v" + videoId} className="collapse out">
                            <p className ='vDescription'>{this.props.description}</p>  
                        </div>


                    </div>
                    </div>
                    
                </div>

                <div className='col-md-4 well well-lg'>
                    <h3>Related Videos</h3>
                    <p> image and title </p>
                </div>

                </div>

        )
    }
}

export default VideoList;