import React from 'react';
import '../Styles/Home.css';
import LeftWidgets from './LeftWidgets';
import Post from '../components/Post';


function Home(props) {

    const styles = {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    }

    return (
        <div style={styles}>
            <LeftWidgets 
                avatar={props.userAvatar}
                username={props.username}
                userSlug={props.userSlug}
                numLikes={props.numLikes}
                numComments={props.numComments}
                postSlug={props.postSlug}
                liked = {props.liked}
                bookmarked={props.bookmarked}
                postIsMine = {props.postIsMine}
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
