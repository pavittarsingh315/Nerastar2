import React, { useEffect, useState } from 'react';
import '../Styles/Home.css';
import Home from '../containers/Home';
import RightMenu from '../containers/RightMenu';

// Redux
import { connect, useDispatch } from 'react-redux';
import { getProfilePosts } from '../redux/actions/posts';
import { viewProfile } from '../redux/actions/general';

// Material Ui
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/core/Alert';


function Profile({ getProfilePosts, posts, isLoading, hasMore, error, match, viewProfile, displayProfile  }) {
    const dispatch = useDispatch();
    const username = match.params.username;
    const [pageNumber, setPageNumber] = useState(2);
    // setTimeout to stop sending getProfilePosts here cause it kept sending them here as well.
    setTimeout(() => {
        window.onscroll = () => {
            if (error || isLoading || !hasMore) return;
            if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.documentElement.clientHeight) {
                getProfilePosts(pageNumber, username)
                setPageNumber(pageNumber + 1);
            }
        }
    }, 100)

    useEffect(() => {
        dispatch({ type: 'CLEAR_POSTS' });
        getProfilePosts(1, username);
        viewProfile(username);
        setPageNumber(2);
    }, [username])

    return (
        <>
            {displayProfile.private && (!displayProfile.areFollowing || displayProfile.areFollowing === 'requested') ? (
                <div className='homepage__left'>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25%'}}>
                        <Alert severity="warning">
                            Private Account. You must be a follower to view their profile
                        </Alert>
                    </div>
                </div>
            ) : (
                <div className='homepage__left'>
                    {posts.map(post => (
                        <div key={post.id}>
                            <Home
                                postSlug={post.slug}
                                username={post.creator}
                                userAvatar={post.creatorAvatar}
                                userSlug={post.creatorSlug}
                                numLikes={post.number_of_likes}
                                numComments={post.number_of_comments}
                                caption={post.content}
                                media={post.media}
                                liked = {post.liked}
                                postIsMine = {!post.postIsMine}
                                bookmarked={post.bookmarked}
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
            )}
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
    error: state.posts.error,
    displayProfile: state.general.displayProfile
})

export default connect(mapStateToProps, { getProfilePosts, viewProfile })(Profile);
