import React from 'react';
import './MusicList.css';
import Song from '../Song/Song';
import cute from './bensound-cute.mp3';
import happyrock from './bensound-happyrock.mp3';
import ukulele from './bensound-ukulele.mp3';

const Songs = [
     {
        "song" : cute,
        "name" : "Cute",
        "author" : "Community"
    },
     {
        "song" : happyrock,
        "name" : "Happy Rock",
        "author" : "Community"
    },
    {
        "song" : ukulele,
        "name" : "Ukulele",
        "author" : "Community"
    },
];
class MusicList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,
            musicSearch: '',
            songs: []
        }
    }
    getPlay = (play) => {
        this.setState({play: play})
    }
    onChange= (e) =>{
        this.setState({musicSearch: e.target.value});
    }
    filterSongs = (songs) => {
        if (songs){
         return songs.filter(song => song.name.includes(this.state.musicSearch) 
                                || song.author.includes(this.state.musicSearch) 
                                || song.name.toLowerCase().includes(this.state.musicSearch)
                                || song.author.toLowerCase().includes(this.state.musicSearch) );
        }
    }
    renderSongs = (songs) => {
        if (songs) {
            return Object.values(songs).map(song => <Song getPlay={this.getPlay} song={song.song} name={song.name} author={song.author}/>)
        }
    }
    render(){
        
        let songs = this.filterSongs(Songs);
        songs = this.renderSongs(songs);
        return (
            <div className="music-list">
                <input type="text" className="music-input" onChange={this.onChange} placeholder="Введите название песни..." />
                <div className="song-list">
                    {songs}
                </div>
            </div>
        )
    }
}
export default MusicList;