import React from 'react';
import './MusicContainer.css';
import MusicList from '../MusicList/MusicList';
class MusicContainer extends React.Component {
    
    render(){
        return (
            <div className="music-container">
                <MusicList />
            </div>
        )
    }
}
export default MusicContainer;