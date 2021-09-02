import React from "react";

export default function Thumbnail(props){
    function getThumbnailUrl(){
        if(props.media_type === "image"){
            return props.url;
        } else if(props.media_type === "video"){
            return props.thumbnail_url;
        } else {
            return " ";
        }
    }
    if(props){
        return(
            <img className="thumbnail" alt="Picture of the Day" src={getThumbnailUrl()} /> 
            )
        } else {
            return null;
        }
}