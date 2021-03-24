import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getReplies } from '../redux/actions/posts';

// Material Ui
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';


function Comment({ id, img, username, comment, numLike, numReplies }) {
    const dispatch = useDispatch();
    const replies = useSelector(state => state.posts.replies);
    const hasMoreReplies = useSelector(state => state.posts.moreReplies);

    const [like, setLike] = useState({ Value: numLike, Click: false });
    const [showReplies, setShowReplies] = useState(false);
    const [pageNumber, setPageNumber] = useState(2);

    const handleReplies = () => {
        setShowReplies(!showReplies);
    }

    const loadMore = () => {
        dispatch(getReplies(id, pageNumber));
        setPageNumber(pageNumber + 1)
    }

    useEffect(() => {
        if(showReplies) {
            dispatch({ type: 'CLEAR_REPLIES' })
            dispatch(getReplies(id, 1));
        } else if (!showReplies) {
            setPageNumber(2);
        }
    }, [showReplies])

    return (
        <>
            <div className='comment' style={{ cursor: 'pointer' }}>
                <div className='comment__body'>
                    <Link to={`/users/${username}`}>
                        <div className='comment__bodyLeft'>
                            <Avatar alt='' src={img} />
                        </div>
                    </Link>
                    <div className='comment__bodyRight' onClick={() => dispatch({ type: 'SELECT_REPLY', payload: { replyReceiver: username, commentId: id } })}>
                        <h3>{username}</h3>
                        <h5>
                            {comment}
                        </h5>
                    </div>
                </div>
                <div className='comment__right'>
                    <div className='comment__like'>
                        {!like.Click ? (
                            <FavoriteBorderIcon onClick={() => {setLike({Value: like.Value + 1, Click: !like.Click})}} />
                        ) : (
                            <FavoriteIcon style={{ color: 'var(--primary-color)' }} onClick={() => {setLike({Value: like.Value - 1, Click: !like.Click})}} />
                        )}
                        <h4>{like.Value}</h4>
                    </div>
                    {numReplies > 0 ? (
                        <div className='comment__replyBtn' onClick={handleReplies}>
                            {!showReplies ? (
                                <>
                                    <h4>{numReplies > 1 ? `${numReplies} Replies` : '1 Reply'}</h4>
                                    <ExpandMoreIcon />
                                </>
                            ) : (
                                <>
                                    <h4>{numReplies > 1 ? 'Hide Replies' : 'Hide Reply'}</h4>
                                    <ExpandLessIcon />
                                </>
                            )}
                        </div>
                    ) : null}
                </div>
            </div>
            <Collapse in={showReplies}>
                <Divider style={{ margin: '10px 0px 10px' }} />
                {replies.map(reply => (
                    <Repliesfunc
                        key={reply.id}
                        parentId={id}
                        img={reply.creatorAvatar}
                        username={reply.creator}
                        reply={reply.body}
                        numLike={reply.number_of_likes}
                    />
                ))}
                {hasMoreReplies ? (
                    <div className='comment__replyBtn' onClick={() => loadMore()}>
                        <h4 style={{ backgroundColor: 'var(--third-color)', padding: '10px', borderRadius: '5px' }}>Load More</h4>
                    </div>
                ) : null}
            </Collapse>
            <Divider style={{ margin: '15px 0px 30px 0px' }} />
        </>
    )
}

export default Comment

function Repliesfunc({ parentId, img, username, reply, numLike }) {
    const dispatch = useDispatch();
    const [like, setLike] = useState({ Value: numLike, Click: false });

    return (
        <div className="comment" style={{ cursor: 'pointer' }}>
            <div className='comment__body'>
                <Link to={`/users/${username}`}>
                    <div className='comment__bodyLeft'>
                        <Avatar alt='' src={img} />
                    </div>
                </Link>
                <div className='comment__bodyRight' onClick={() => dispatch({ type: 'SELECT_REPLY', payload: { replyReceiver: username, commentId: parentId } })}>
                    <h3>{username}</h3>
                    <h5>
                        {reply}
                    </h5>
                </div>
            </div>
            <div className='comment__right'>
                <div className='comment__like'>
                    {!like.Click ? (
                        <FavoriteBorderIcon onClick={() => {setLike({Value: like.Value + 1, Click: !like.Click})}} />
                    ) : (
                        <FavoriteIcon style={{ color: 'var(--primary-color)' }} onClick={() => {setLike({Value: like.Value - 1, Click: !like.Click})}} />
                    )}
                    <h4>{like.Value}</h4>
                </div>
            </div>
        </div>
    )
};