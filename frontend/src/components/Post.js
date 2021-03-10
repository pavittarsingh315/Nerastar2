import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';


function Post({ caption, media, video, slug }) {

    return (
        <div className='feed'>
            <div className='post'>
                <Link to={`posts/${slug}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '15px 10px' }}>
                        <p style={{ fontWeight: '900', fontSize: '15px' }}>{caption}</p>
                    </div>
                </Link>
                <div style={{ maxWidth: '600px', maxHeight: '670px', margin: '0 auto' }}>
                    {!video ? (
                        <img style={{ maxHeight: '600px', maxWidth: '600px', borderRadius: '5px' }} alt="" src={media} />
                    ) : (
                        <VideoPlayer src={media} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;