import React, { useState } from 'react';
import '../Styles/Home.css';

// Material UI
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkIcon from '@material-ui/icons/Bookmark';


function LeftWidgetOption({ objValue, uiIcon, link }) {
    const [instance, setInstance] = useState({ Value: objValue.toLocaleString(), Icon: uiIcon, Clicked: false })

    const handleClick = () => {
        switch(uiIcon.type.render.displayName) {
            case "FavoriteBorderIcon": 
                if(!instance.Clicked) {
                    setInstance({
                        Value: (objValue + 1).toLocaleString(),
                        Icon: FavoriteIcon,
                        Clicked: true
                    })
                } else {
                    setInstance({
                        Value: objValue.toLocaleString(),
                        Icon: uiIcon,
                        Clicked: false
                    })
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
                    navigator.clipboard.writeText('http://localhost:3000/posts/' + link)
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

export default LeftWidgetOption;
