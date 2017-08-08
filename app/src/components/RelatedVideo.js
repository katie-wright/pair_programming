import React, { Component } from 'react';
import Modal from './Modal';
// import {Link} from 'react-router';
import axios from 'axios';
// const YouTubeIframeLoader = require('youtube-iframe') ;


class RelatedVideoList extends Component {
    constructor() {
        super();
        this.state = {
            videos: []
        }
    }

    componentWillMount() {
        const promise = axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                'key': 'AIzaSyC5lJIkV7lPWS9p_gC3LB50Yy8fQOrKjuY',
                'part': 'snippet',
                'type': 'video',
                'relatedToVideoId': this.props.videoId
            }
        });
        promise.then(result => {
            console.log("Success!");
            console.log("RelatedVideos:" + result);
            this.setState({
                videos: result.data.items
            })
        });
        promise.catch(error => {
            console.log(error);
        });
    }

    render() {
        let relatedVideoList = this.state.videos.map((video) => {
            return (
                <RelatedVideo
                    id={video.id.videoId}
                    title={video.snippet.title}
                    thumbnailURL={video.snippet.thumbnails.default.url} />
            )
        })

        return (
            <div>
                {relatedVideoList}
            </div>

        )
    }
}


class RelatedVideo extends Component {

    render() {
                            
        return (
            <div>
                <span> 
                    <img src={this.props.thumbnailURL} />
                    <p> {this.props.title} </p>
                    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target={"#myModal" + this.props.id}>Play</button>
                    <Modal id={this.props.id} title={this.props.title} />
                </span>
            </div>
        )


    }
}

export default RelatedVideoList;
