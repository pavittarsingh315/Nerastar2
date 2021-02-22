import React from 'react';
import '../Styles/Home.css';
import LeftWidgetOption from '../components/LeftWidetOptions';
import Comments from './Comments';

// Redux
import { useDispatch } from "react-redux";
import { viewProfile } from "../redux/actions/general";

// Material Ui
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';


function LeftWidgets({avatar, username, userSlug, numPlays, numLikes, numComments, postSlug, liked, postIsMine}) {
    const dispatch = useDispatch();
    
    return (
        <div className='leftwidgets'>

            <div className="leftwidgetoption" onClick={() => dispatch(viewProfile(userSlug))}>
                <Avatar alt='' src={avatar} />
                <h2>{username}</h2>
            </div>

            {/* <LeftWidgetOption objValue={numPlays} uiIcon={PlayCircleOutlineIcon} /> */}
            
            <LeftWidgetOption postSlug={postSlug} liked={liked} objValue={numLikes} uiIcon={liked ? FavoriteIcon : FavoriteBorderIcon} />

            <Comments objValue={numComments} Icon={ChatOutlinedIcon} />

            <LeftWidgetOption objValue="Bookmark" uiIcon={BookmarkBorderIcon} />
            <LeftWidgetOption postSlug={postSlug} objValue="Share" uiIcon={SendIcon} />
            {!postIsMine ? <LeftWidgetOption postSlug={postSlug} objValue="Edit Post" uiIcon={EditIcon} /> : null}

        </div>
    )
}

export default LeftWidgets;
