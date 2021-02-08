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
                        <video height='315' width='600' autoPlay loop muted controls src={media} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Post;