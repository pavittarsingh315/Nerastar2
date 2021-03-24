import React from 'react';
import '../Styles/Home.css';
import LeftWidgetOption from '../components/LeftWidetOptions';
import { Link } from "react-router-dom";
import Comments from './Comments';


// Material Ui
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

            <LeftWidgetOption postSlug={postSlug} liked={liked} objValue={numLikes} uiIcon={liked ? FavoriteIcon : FavoriteBorderIcon} />

            <Comments postSlug={postSlug} objValue={numComments} Icon={ChatOutlinedIcon} />

            <LeftWidgetOption objValue="Bookmark" uiIcon={BookmarkBorderIcon} />
            <LeftWidgetOption postSlug={postSlug} objValue="Share" uiIcon={SendIcon} />
            {!postIsMine ? <LeftWidgetOption postSlug={postSlug} objValue="Edit Post" uiIcon={EditIcon} /> : null}

        </div>
    )
}

export default LeftWidgets;
