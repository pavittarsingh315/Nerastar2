import React, { useEffect } from 'react';
import '../Styles/Home.css';
import Home from '../containers/Home';
import RightMenu from '../containers/RightMenu';

// Redux
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/posts';

// Material Ui
import Divider from '@material-ui/core/Divider';


function HomePage({ getPosts, posts }) {
    useEffect(() => {
        getPosts();
    }, [getPosts])

    return (
        <>
            <div className='homepage__left'>
                {posts.map(post => (
                    <div key={post.id}>
                        <Home
                            postSlug={post.slug}
                            username={post.creator}
                            userAvatar={post.creatorAvatar}
                            userSlug={post.creatorSlug}
                            numPlays={69}
                            numLikes={post.number_of_likes}
                            numComments={post.number_of_comments}
                            caption={post.content}
                            media={post.media}
                            liked = {post.liked === 'true' ? true : false}
                            video={post.extension === 'video' ? true : false}
                        />
                        <Divider className='homepage__divider' />
                    </div>
                ))}
            </div>
            <div className='homepage__right'>
                <div className='homepage__rightInner'>
                <RightMenu />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    posts: state.posts.posts
})

export default connect(mapStateToProps, { getPosts })(HomePage);
