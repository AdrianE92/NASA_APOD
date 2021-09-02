import React, {useState} from "react";
import "../App.css";
export default function Media(props) {
    const [showFullExplanation, setShowFullExplanation] = useState(false);
    const [buttonText, setButtonText] = useState("Show");

    function getExplanation(){
        if(showFullExplanation){
            return props.explanation;
        } else {
            return props.explanation.substring(0, 100);
        }
    }

    function toggleExplanation(){
        setShowFullExplanation(!showFullExplanation);
        setButtonText(showFullExplanation? "Show" : "Hide");
    }


    function renderMedia(){
        if(props.media_type === "image"){
            return (<img src={props.url} alt={props.title} />)
        } else if(props.media_type === "video") {
            //As far as I could tell, all videos that NASA posts are from YouTube.
            return (<iframe width="560" height="315" 
            src={props.url}
            title="YouTube video player" 
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen></iframe>)
        } else {
            return (<h3>Unknown media type</h3>)
        }
    }

    if(props.url !== undefined){
        return (
            <div>
                <h3>{props.title}</h3>
                {renderMedia()}
                <p className="explanation">{getExplanation()}</p>
                <button className="button" onClick={toggleExplanation}> {buttonText} </button>
            </div>   
            )
        } else {
            return(
                <h3>No media found</h3>
            )
        }
    }    
