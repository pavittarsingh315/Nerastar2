import React from 'react';
import '../Styles/Home.css';
import LeftWidgets from './LeftWidgets';
import Post from '../components/Post';


function Home(props) {

    const styles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

    return (
        <div style={styles}>
            <LeftWidgets 
                avatar={props.userAvatar}
                username={props.username}
                userSlug={props.userSlug}
                numPlays={props.numPlays}
                numLikes={props.numLikes}
                numComments={props.numComments}
                postSlug={props.postSlug}
            />
            <Post 
                caption={props.caption}
                media={props.media}
                video={props.video}
                slug={props.postSlug}
            />
        </div>
    )
}

export default Home;
