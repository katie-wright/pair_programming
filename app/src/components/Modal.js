import React, { Component } from 'react';
const YouTubeIframeLoader = require('youtube-iframe') ;

class Modal extends Component {
    constructor () {
        super();
        this.killModal=this.killModal.bind(this);
    }
    

    killModal () {
        let player = document.getElementById('player' + this.props.id);
        player.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        // document.getElementById('player' + this.props.id).remove();
    }
        
    render() {
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

