import React, { Component } from 'react';
// import {Link} from 'react-router';
import axios from 'axios';
const YouTubeIframeLoader = require('youtube-iframe') ;

class Modal extends Component {
    constructor () {
        super();
        this.killModal=this.killModal.bind(this);
    }
    

    killModal () {
            document.getElementById('player' + this.props.id).remove();
        }
        
    render() {
        console.log("modal player:", this.modalPlayer)
        let videoId = this.props.id;
        YouTubeIframeLoader.load(function(YT) {
                                new YT.Player('player' + videoId, {
                                height: '300',
                                width: '500',
                                videoId: videoId
                                });
                            });
        return(
            <div id={"myModal" + this.props.id} className="modal fade" role="dialog">
                    <div className="modal-dialog">

                        <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" onClick={this.killModal} className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.props.title}</h4>
                        </div>
                        <div className="modal-body">
                            <div id={'player' + videoId}>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.killModal} className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default Modal;
/*
<!-- Trigger the modal with a button -->
<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

<!-- Modal -->*/
