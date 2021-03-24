import React, { useState, useEffect, useRef } from 'react';
import Comment from '../components/Comment';

// Redux
import { connect, useDispatch } from 'react-redux';
import { getComments, addComment } from '../redux/actions/posts';

// Material Ui
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';

function Comments({ Icon, objValue, comments, getComments, postSlug, createReply }) {
    const dispatch = useDispatch();
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [pageNumber, setPageNumber] = useState(2);
    const commentRef = useRef();

    const handleComments = () => {
        setCommentsOpen(!commentsOpen);
    };

    useEffect(() => {
        if(createReply.replyReceiver) {
            setComment(`@${createReply.replyReceiver} `);
            if(commentRef.current) {
                commentRef.current.focus()
            }
        }
    }, [createReply])

    useEffect(() => {
        if(commentsOpen) {
            dispatch({ type: 'CLEAR_COMMENTS' })
            getComments(postSlug, 1);
            setComment('');
        }
    }, [commentsOpen])

    const postComment = e => {
        e.preventDefault()

        if(createReply.replyReceiver && createReply.commentId) {
            const com = new FormData();
            com.append('type', 'reply')
            com.append('comment', comment)
            com.append('receiver', createReply.replyReceiver)
            com.append('commentId', createReply.commentId)
    
            dispatch(addComment(com, postSlug))
        } else {
            const com = new FormData();
            com.append('type', 'comment')
            com.append('comment', comment)
    
            dispatch(addComment(com, postSlug))
        }

        setComment('');
        dispatch({ type: 'SELECT_REPLY', payload: { replyReceiver: null, commentId: null } })
    }

    return (
        <div>
            <div className='comments__option' onClick={handleComments}>
                <Icon />
                <h2>{objValue}</h2>
            </div>

            <Dialog maxWidth='sm' fullWidth onClose={handleComments} aria-labelledby="comments-title" open={commentsOpen}>
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Comments</Typography>
                </MuiDialogTitle>
                <MuiDialogContent dividers className='generalModal'>
                    {comments.length === 0 ? (
                        <div className='modalLoading'>
                            <h2>Nothing here!</h2>
                        </div>
                    ) : (
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                id={comment.id}
                                img={comment.creatorAvatar}
                                username={comment.creator}
                                comment={comment.body}
                                numLike={comment.number_of_likes}
                                numReplies={comment.number_of_replies}
                            />
                        ))
                    )}
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' style={{ justifyContent: 'center' }}>
                    <div style={{ width: '75%' }}>
                        <form onSubmit={e => postComment(e)} style={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                            {!createReply.replyReceiver ? (
                                <MicIcon style={{ paddingRight: '10px', color: 'var(--secondary-color)' }} />
                            ) : (
                                <div className='reply__cancelBtn' onClick={() => { dispatch({ type: 'DELETE_REPLY' }); setComment(''); } }>
                                    <h4 style={{ backgroundColor: 'var(--third-color)', padding: '5px', borderRadius: '5px' }}>Cancel</h4>
                                </div>
                            )}
                            <input ref={commentRef} className='comment__input' value={comment} onChange={e => setComment(e.target.value)} placeholder="Any comments?" type="text" />
                        </form>
                    </div>
                </MuiDialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.posts.comments,
    createReply: state.posts.createReply
})

export default connect(mapStateToProps, { getComments })(Comments);
