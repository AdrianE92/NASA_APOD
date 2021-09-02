import '../App.css';
import React, {useState, useEffect } from 'react';
import Media from "./Media.js";
import Thumbnail from "./Thumbnail.js";
import key from "../nasa_key.js";

export default function NasaApod(){
    const KEY = key;
    const [media, setMedia] = useState([]);
    const [index, setIndex] = useState(0);
    function loadMedia(){
        return fetchMedia(getRandomDate());
    }
    
    function getCurrentMedia(){
        if(media.length === 0){
            return {};
        } else {
            return media[index];
        }
    }
    
    function getCurrentDay(){
        return formatDate(new Date());
    }
    
    function getRandomDate(){
        // Looking at NASA's apod archive, the first image was published 01.01.2015
        let start = new Date(2015, 0, 1);
        let end = new Date();
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return formatDate(date);
    }
    
    function addZeroToSingleDigit(date){
        date = ("0" + date);
        return date.substring(date.length-2, date.length);
    }
    
    function formatDate(date){
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        day = addZeroToSingleDigit(day);
        month = addZeroToSingleDigit(month);
        return year + "-" + month + "-" + day;
    }
    
    function displayMediaList(){
        // Maps over all images stored in media and displays them as thumbnails.
        // When thumbnail is clicked, reload the displayed media.
        return media.map((singleMedia) => 
        <div onClick={() => setIndex(media.indexOf(singleMedia))} key={singleMedia.url} className="thumbnail_con">
        {
            Thumbnail(singleMedia)
        }
        </div>
        );
    }


    async function fetchMedia(date) {
        // Fetch media from NASA and store it in the media array, and update index.
        // You can get your own API-key for free at api.nasa.gov
        let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=' + KEY +'&date=' + date + '&thumbs=true')
        let json = await response.json();
        let mediaList = [...media];
        mediaList.push(json);
        setMedia(mediaList);
        setIndex(mediaList.length-1);
    }
    
    useEffect(
        () => {
        fetchMedia(getCurrentDay());
    }, []);

    return (
        <div className="App">
        <header className="App-header">
          <div>
          {Media(getCurrentMedia())}
          <button className="button" onClick={() => loadMedia()}> Load new image </button>
          </div>
          <div>
            {displayMediaList()}
          </div> 
        </header>
      </div>
    );
  }
