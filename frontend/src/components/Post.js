import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';


function Post({ caption, media, video, slug }) {


    return (
        <div className='feed'>
            <div className='post'>
                <div className='post__header'>
                    <p>{caption}</p>
                </div>
                <div className='post__media'>
                    {!video ? (
                        <div className="img__container">
                            <img alt="" src={media} />
                        </div>
                    ) : (
                        <VideoPlayer src={media} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;