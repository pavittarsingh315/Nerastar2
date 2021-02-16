import React, { useState, useEffect } from 'react';
import '../Styles/Modal.css';

// Material Ui
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';


const comments = [
    {
        id: 1,
        img: 'https://www.carscoops.com/wp-content/uploads/2019/09/771ea1bd-laferrari-1.jpg',
        username: 'La Ferrari',
        comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
        numLikes: 112,
        replies : [
            {
                id: 3,
                img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/02-ss300p-3i4-front-1567937037.jpg',
                username: 'Buggati',
                comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
                numLikes: 56
            },
            {
                id: 4,
                img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-lamborghini-aventador-mmp-1-1601499002.jpg',
                username: 'Lamborghini',
                comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
                numLikes: 947
            }
        ]
    },
    {
        id: 2,
        img: 'https://media.architecturaldigest.com/photos/5acd0da02204b06f8e237d8f/master/w_3000,h_2000,c_limit/Aston_Martin_V8_Vantage_AMV_8_-_Portugal(6).jpg',
        username: 'Aston Martin',
        comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
        numLikes: 24,
        replies : [
            {
                id: 4,
                img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-lamborghini-aventador-mmp-1-1601499002.jpg',
                username: 'Lamborghini',
                comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
                numLikes: 947
            },
            {
                id: 3,
                img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/02-ss300p-3i4-front-1567937037.jpg',
                username: 'Buggati',
                comment: 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis',
                numLikes: 56
            }
        ]
    },
]


function Comments({ Icon, objValue }) {
    const [isLoading, setIsLoading] = useState(false)
    const [commentsOpen, setCommentsOpen] = useState(false);

    const handleComments = () => {
        setCommentsOpen(!commentsOpen);
    };

    useEffect(() => {
        // by using use effect to change loading, the modal doesnt close everytime the isLoading changes
        setIsLoading(false)
    }, [])

    return (
        <div>
            <div className='comments__option' onClick={handleComments}>
                <Icon />
                <h2>{objValue}</h2>
            </div>


            <Dialog maxWidth='sm' fullWidth onClose={handleComments} aria-labelledby="comments-title" open={commentsOpen}>
                <MuiDialogTitle disableTypography className='modalTitle'>
                    <Typography align='center' variant="h6">Comments</Typography>
                    {handleComments ? (
                    <IconButton aria-label="close" className='modalCloseBtn' onClick={handleComments} style={{ color: 'var(--primary-color)', backgroundColor: 'var(--third-color)' }}>
                        <CloseIcon />
                    </IconButton>
                    ) : null}
                </MuiDialogTitle>
                <MuiDialogContent dividers className='generalModal'>
                    {isLoading ? (
                        <div className='comments__loading'>
                            <CircularProgress style={{ color: 'var(--primary-color)' }} />
                        </div>
                    ) : (
                        comments.map(comment => (
                            <Comment
                                key={comment.id}
                                img={comment.img}
                                username={comment.username}
                                comment={comment.comment}
                                numLike={comment.numLikes}
                                replies={comment.replies && comment.replies} 
                            />
                        ))
                    )}
                </MuiDialogContent>
                <MuiDialogActions className='modalAction' />
            </Dialog>
        </div>
    )
}

export default Comments;


function Comment({ img, username, comment, numLike, replies }) {
    const [like, setLike] = useState({ Value: numLike, Click: false });
    const [showReplies, setShowReplies] = useState(false);

    const handleReplies = () => {
        setShowReplies(!showReplies)
    }

    useEffect(() => {
        console.log(like.Value)
    }, [like])

    return (
        <>
            <div className='comment'>
                <div>
                    <Avatar alt='' src={img} />
                </div>
                <div className='comment__body'>
                    <h3>{username}</h3>
                    <h5>
                        {comment}
                    </h5>
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
                    <div className='comment__replyBtn' onClick={handleReplies}>
                        {!showReplies ? (
                            <>
                                <h4>Show Replies</h4>
                                <ExpandMoreIcon />
                            </>
                        ) : (
                            <>
                                <h4>Hide Replies</h4>
                                <ExpandLessIcon />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Collapse in={showReplies}>
                <Divider style={{ margin: '10px 0px 10px' }} />
                {replies.map(reply => (
                    <Repliesfunc
                        key={reply.id}
                        img={reply.img}
                        username={reply.username}
                        reply={reply.comment}
                        numLike={reply.numLikes}
                    />
                ))}
            </Collapse>
            <Divider style={{ margin: '15px 0px' }} />
        </>
    )
}


function Repliesfunc({ img, username, reply, numLike }) {
    const [like, setLike] = useState({ Value: numLike, Click: false });

    useEffect(() => {
        console.log(like.Value)
    }, [like])

    return (
        <div className="comment">
            <div>
                <Avatar alt='' src={img} />
            </div>
            <div className='comment__body'>
                <h3>{username}</h3>
                <h5>
                    {reply}
                </h5>
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