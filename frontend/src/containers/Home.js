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
                avatar={props.user.avatar}
                username={props.user.username}
                userSlug={props.user.slug}
                numPlays={props.numPlays}
                numLikes={props.numLikes}
                numComments={props.numComments}
                postSlug={props.slug}
            />
            <Post 
                caption={props.caption}
                media={props.media}
                video={props.video}
                slug={props.slug}
            />
        </div>
    )
}

export default Home;
