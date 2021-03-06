import React, {Component} from 'react';
// import {Link} from 'react-router';
import axios from 'axios';
import RelatedVideoList from "./RelatedVideo";
const YouTubeIframeLoader = require('youtube-iframe') ;

class VideoList extends Component {
    constructor(){
        super();
        this.state={
            videos:[],
            showError: false
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
      this.setState({
        videos: result.data.items,
        showError: false
      })
    });
    promise.catch(error=>{
      console.log(error);
        this.setState({
            showError: true
        })
    });
  }
    render(){
        let vlist = this.state.videos.map((video,i)=>{
            return (
                <Video 
                    key={i}
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
                    <h2 className="text-uppercase text-left well">{this.props.currentCategory}</h2>
                    {this.state.showError ?   
                    <p>We're sorry, the category you have requested no long exists. Click <a href="/">here</a> to go back to the Hottest videos.</p>
                    :
                    vlist
                    }
                    
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
                    <div className="panel-heading"><h3 > {this.props.title} </h3></div>
                    <div className="panel-body" >
                        <div id={'player' + videoId}>
                        </div>

                    <div className="panel-footer">
                        <h4 className="alert alert-warning">Posted By: {this.props.user}</h4>
                        
                        
                        <button type="button" className="btn btn-info btn-video" data-toggle="collapse" data-target={"#v" + videoId}>View/Hide Description</button>
                        <div id={"v" + videoId} className="collapse out">
                            <p className ='vDescription'>{this.props.description}</p>  
                        </div>
                        <p>Date: {this.props.date.substring(0,10)}</p>
                        <h4 className="alert alert-warning">Views: {this.props.views.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h4>
                        
                    </div>




                    </div>
                    </div>
                    
                </div>

                <div className='col-md-4 well '>
                    <RelatedVideoList videoId={videoId} />
                </div>

                </div>

        )
    }
}

export default VideoList;