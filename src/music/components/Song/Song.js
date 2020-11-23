import React from 'react';
import './Song.css';
import ReactAudioPlayer from 'react-audio-player';
class Song extends React.Component {
    constructor(props) {
        super(props);
        this.state={playing: false}
    }
    setPlaying = () => {
        this.setState({playing: !this.state.playing})
        this.props.getPlay(this.state.playing);
    }
    stopAnyOtherCurrentlyPlayingAudio = (event) => {

        for(const audio of document.querySelectorAll('audio')) {
    
            // Only pause audio objects that are not the audio object 
            // clicked by the user
            if(audio !== event.currentTarget) {
    
                audio.pause()
                audio.currentTime = 0; // Do this to reset play head,
                // simulate "stop"
            }
        }
    }
    render(){
        
        return (
            <div className="song-container">
                <div className="song-info">
                    <div className="song-author">
                        {this.props.author}  -                        
                    </div>
                    <div className="song-name">
                        {this.props.name}
                    </div>
                </div>
                <ReactAudioPlayer onPlay={e =>  this.stopAnyOtherCurrentlyPlayingAudio(e) } onPause={this.setPlaying} className="song" src={this.props.song} controls/>

            </div>
        )
    }
}
export default Song;