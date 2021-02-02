import React from 'react';
import { useHistory } from 'react-router-dom';


function Post({ caption, media, video, slug }) {
    const history = useHistory();
    const handleClick = () => {
        history.push(`/posts/${slug}`)
    }

    return (
        <div className='feed' onClick={() => handleClick()}>
            <div className='post'>
                <div className='post__header'>
                    <p>{caption}</p>
                </div>
                <div className='post__media'>
                    {!video ? (
                        <img alt='' src={media} />
                    ) : (
                        <iframe
                            title={caption}
                            width='600'
                            height='315'
                            src={media}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;