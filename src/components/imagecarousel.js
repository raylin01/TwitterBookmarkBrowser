import React from 'react';
import Carousel from 'react-material-ui-carousel'

export function ImageCarousel(props){
    const { media, modalOpen, modalContent, sizes } = props;
    const moreThanOne = media && media.length > 1;

    let items = media.map( (item, i) => {
        if(item.type === "photo"){
            return (
                <img src={process.env.PUBLIC_URL + item.link} key={i} style={{borderRadius: sizes["borderRadius"], maxWidth: sizes["imageMaxWidth"]}} alt="tweet media"
                    onClick={()=>{
                        modalContent(<img src={process.env.PUBLIC_URL + item.link} alt="modal" style={{maxHeight: "100%", position: "absolute", transform: 'translate(-50%, -50%)', top: "50%", left: "50%"}}/>);
                        modalOpen();
                    }}/>
            )
        }else if(item.type === "video"){
            let videoUrl = "";
            let bitrate = 0;
            for (let i = 0; i < item.video_src.length; i++) {
                if(item.video_src[i].content_type === "video/mp4"){
                    if(item.video_src[i].bitrate > bitrate){
                        bitrate = item.video_src[i].bitrate;
                        videoUrl = item.video_src[i].url;
                    }
                }
            }
            return (
                <video src={process.env.PUBLIC_URL + videoUrl} key={i} style={{borderRadius: sizes["borderRadius"], maxWidth: sizes["imageMaxWidth"]}} controls/>
            )
        }
        return (<></>);
    } )
    return (
        <>
            {moreThanOne ? 
            <Carousel>
                {items}
            </Carousel> : 
            <>{items}</>}
        </>
    );
}