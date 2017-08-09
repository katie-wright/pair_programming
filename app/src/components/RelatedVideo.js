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
            this.setState({
                videos: result.data.items
            })
        });
        promise.catch(error => {
            console.log(error);
        });
    }

    render() {
        let relatedVideoList = this.state.videos.map((video, i) => {
            return (
                <RelatedVideo
                    key={i}
                    id={video.id.videoId}
                    title={video.snippet.title}
                    thumbnailURL={video.snippet.thumbnails.default.url} />
            )
        })

        return (

            <div className="rvBox">
                <h3 className="text-left">Related Videos</h3>        
                <table className="table table-striped">
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
                <tr className='rvRow'>
                    <td><img src={this.props.thumbnailURL} /></td>
                    <td className='rvTitle'><a role="button" data-toggle="modal" data-target={"#myModal" + this.props.id}>{this.props.title}</a> </td>
                    <Modal id={this.props.id} title={this.props.title} />
                </tr>            

        )


    }
}

export default RelatedVideoList;
