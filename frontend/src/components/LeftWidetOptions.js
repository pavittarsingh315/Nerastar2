import React, { useState } from 'react';
import '../Styles/Home.css';

// Redux
import { connect } from 'react-redux';
import { likeUnlikePost } from '../redux/actions/posts';

// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function LeftWidgetOption({ objValue, uiIcon, postSlug, liked, likeUnlikePost }) {
    const [instance, setInstance] = useState({ Value: objValue.toLocaleString(), Icon: uiIcon, Clicked: false, liked: liked })

    const handleClick = () => {
        switch(uiIcon.type.render.displayName) {
            case "FavoriteBorderIcon": 
                if (!instance.liked) {
                    setInstance({
                        Value: (objValue + 1).toLocaleString(),
                        Icon: FavoriteIcon,
                        liked: true
                    })
                    likeUnlikePost(postSlug, true)
                } else {
                    setInstance({
                        Value: (objValue).toLocaleString(),
                        Icon: uiIcon,
                        liked: false
                    })
                    likeUnlikePost(postSlug, false)
                }
                break;
            case "FavoriteIcon":
                if (instance.liked) {
                    setInstance({
                        Value: (objValue - 1).toLocaleString(),
                        Icon: FavoriteBorderIcon,
                        liked: false
                    })
                    likeUnlikePost(postSlug, false)
                } else {
                    setInstance({
                        Value: (objValue + 0).toLocaleString(),
                        Icon: uiIcon,
                        liked: true
                    })
                    likeUnlikePost(postSlug, true)
                }
                break;
            case "BookmarkBorderIcon":
                if(!instance.Clicked) {
                    setInstance({
                        Value: "Bookmarked",
                        Icon: BookmarkIcon,
                        Clicked: true
                    })
                } else {
                    setInstance({
                        Value: "Bookmark",
                        Icon: uiIcon,
                        Clicked: false
                    })
                }
                break;
            case "SendIcon":
                if(!instance.Clicked) {
                    // this copys the current path to the users clipboard
                    navigator.clipboard.writeText('http://localhost:3000/posts/' + postSlug)
                }
                break;
            default: 
                break;
        }
    }

    return (
        <div className="leftwidgetoption" onClick={handleClick}>
            <instance.Icon />
            <h2>{instance.Value}</h2>
        </div>
    )
}

export default connect(null, { likeUnlikePost })(LeftWidgetOption);
