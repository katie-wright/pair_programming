import React, {Component} from 'react';
import {Link} from 'react-router';

class VideoList extends Component {
    render(){
        let vlist = this.props.videos.map((video,i)=>{
            return (
                <Video 
                    key={video.id}
                    title={video.snippet.title}
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
        return (
                <div>
                    <h1> {this.props.title} </h1>
                </div>
        )
    }
}

export default VideoList;