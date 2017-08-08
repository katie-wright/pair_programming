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

            <div class="container">
                <h2>Related Videos</h2>        
                <table class="table table-striped">
                    <tbody>
                        {relatedVideoList}
                    </tbody>
                </table>
            </div>



        )
    }
}


class RelatedVideo extends Component {

    render() {
                            
        return (
            // <div>
                <tr className='rvRow'>
                    <td><img src={this.props.thumbnailURL} /></td>
                    <td className='rvTitle'><a data-toggle="modal" data-target={"#myModal" + this.props.id}>{this.props.title}</a> </td>
                    <Modal id={this.props.id} title={this.props.title} />
                </tr>            

        )


    }
}

export default RelatedVideoList;
