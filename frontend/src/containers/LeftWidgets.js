import React from 'react';
import '../Styles/Home.css';
import LeftWidgetOption from '../components/LeftWidetOptions';
import { Link } from "react-router-dom";
import Comments from './Comments';

// Material Ui
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import SendIcon from '@material-ui/icons/Send';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';


function LeftWidgets({avatar, username, userSlug, numPlays, numLikes, numComments, postSlug, liked, postIsMine}) {
    return (
        <div className='leftwidgets'>

            <Link to={`/${userSlug}`} className='leftwidgets__profile'>
                <div className="leftwidgetoption">
                    <Avatar alt='' src={avatar} />
                    <h2>{username}</h2>
                </div>
            </Link>

            <LeftWidgetOption objValue={numPlays} uiIcon={PlayCircleOutlineIcon} />
            
            <LeftWidgetOption postSlug={postSlug} liked={liked} objValue={numLikes} uiIcon={liked ? FavoriteIcon : FavoriteBorderIcon} />

            <Comments objValue={numComments} Icon={ChatOutlinedIcon} />

            <LeftWidgetOption objValue="Bookmark" uiIcon={BookmarkBorderIcon} />
            <LeftWidgetOption postSlug={postSlug} objValue="Share" uiIcon={SendIcon} />
            {!postIsMine ? <LeftWidgetOption postSlug={postSlug} objValue="Edit Post" uiIcon={EditIcon} /> : null}

        </div>
    )
}

export default LeftWidgets;
