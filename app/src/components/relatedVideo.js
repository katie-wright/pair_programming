import React, {Component} from 'react';
// import {Link} from 'react-router';
import axios from 'axios';


class relatedVideoList extends component {
    constructor() {
        super();
        this.state={
            videos:[]
            }
        }
    }

componentWillMount () {

     const promise = axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        'key': 'AIzaSyC5lJIkV7lPWS9p_gC3LB50Yy8fQOrKjuY',
        'part': 'snippet',
        'type': 'video',
        'relatedToVideoId' : this.props.videoId    
    }});
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


    render () {

        let relatedVideoList = relatedVideos.map((video)=> {
    return (
        <related 
            id={video.id}
            title={video.snippet.title}
            thumbnailURL={video.snippet.thumbnails.default.url} />
    )
})

        return (
            <div>


            </div>

        )



    }





class relatedVideo extends Component {
    render () {

        return (
            <div>


            </div>

        )


    }
}

export default relatedVideoList;