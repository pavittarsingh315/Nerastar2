import React, { useState } from 'react';
import '../Styles/Home.css';
import { Link } from "react-router-dom";
import Comments from './Comments';

// Redux
import { useDispatch } from 'react-redux';
import { likeUnlikePost, handleBookmark } from '../redux/actions/posts';
import { createAlert } from '../redux/actions/alerts';

// Material Ui
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function LeftWidgets({avatar, username, userSlug, numLikes, numComments, postSlug, liked, postIsMine, bookmarked}) {
    const dispatch = useDispatch();
    const [likedPost, setLikedPost] = useState(liked);
    var [numberLikes, setNumberLikes] = useState(numLikes);
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    var [bookmark, setBookmark] = useState(`${bookmarked ? 'Bookmarked' : 'Bookmark'}`);
    
    const handleLikeClick = () => {
        if (likedPost) {
            setNumberLikes(--numberLikes);
            dispatch(likeUnlikePost(postSlug, false));
        } else if (!likedPost) {
            setNumberLikes(++numberLikes);
            dispatch(likeUnlikePost(postSlug, true));
        }
        setLikedPost(!likedPost)
    }

    const handleBookmarkClick = () => {
        if(isBookmarked) {
            setBookmark('Bookmark')
        } else if (!isBookmarked) {
            setBookmark('Bookmarked')
        }
        dispatch(handleBookmark(postSlug))
        setIsBookmarked(!isBookmarked)
    }

    const handleShareClick = () => {
        navigator.clipboard.writeText('http://localhost:3000/posts/' + postSlug);
        dispatch(createAlert("success", "Link Copied!"))
    }
    
    return (
        <div className='leftwidgets'>
            <Link to={`/users/${userSlug}`} className='leftwidgets__profile'>
                <div className="leftwidgetoption">
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                    >
                        <Avatar variant='circle' style={{ width: '56px', height: '56px' }} alt='' src={avatar} />
                        <h2 style={{ fontSize: '20px', marginLeft: '5px' }}>{username}</h2>
                    </div>
                </div>
            </Link>

            <div className="leftwidgetoption" onClick={handleLikeClick}>
                {likedPost ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                <h2>{numberLikes}</h2>
            </div>

            <Comments postSlug={postSlug} objValue={numComments} Icon={ChatOutlinedIcon} />

            <div className="leftwidgetoption" onClick={handleBookmarkClick}>
                {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                <h2>{bookmark}</h2>
            </div>

            <div className="leftwidgetoption" onClick={handleShareClick}>
                <SendIcon />
                <h2>Share</h2>
            </div>

            {!postIsMine ? (
                <div className="leftwidgetoption" onClick={() => console.log(postSlug)}>
                    <EditIcon />
                    <h2>Edit Post</h2>
                </div>
            ) : null}
        </div>
    )
}

export default LeftWidgets;
