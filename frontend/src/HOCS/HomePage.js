import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import Home from '../containers/Home';
import RightMenu from '../containers/RightMenu';

// Redux
import { connect, useDispatch } from 'react-redux';
import { getPosts } from '../redux/actions/posts';

// Material Ui
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';


function HomePage({ getPosts, posts, isLoading, hasMore, error }) {
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(2);
    window.onscroll = () => {
        if (error || isLoading || !hasMore) return;
        if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
            getPosts(pageNumber);
            setPageNumber(pageNumber + 1);
        }
    }

    useEffect(() => {
        dispatch({ type: 'CLEAR_POSTS' })
        getPosts(1);
        setPageNumber(2);
    }, [])

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
                            postIsMine = {post.postIsMine === 'false' ? true : false}
                            video={post.extension === 'video' ? true : false}
                        />
                        <Divider className='homepage__divider' />
                        
                    </div>
                ))}
                {isLoading ? (
                    <div>
                        <LinearProgress className='post__loading' />
                    </div>
                ) : null}
                {!hasMore && <h2 className='noMorePosts'>The End!</h2>}
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
    posts: state.posts.posts,
    isLoading: state.posts.isLoading,
    hasMore: state.posts.hasMore,
    error: state.posts.error
})

export default connect(mapStateToProps, { getPosts })(HomePage);
