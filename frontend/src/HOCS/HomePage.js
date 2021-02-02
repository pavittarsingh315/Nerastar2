import React from 'react';
import '../Styles/Home.css';
import Home from '../containers/Home';
import RightMenu from '../containers/RightMenu';

// Material Ui
import Divider from '@material-ui/core/Divider';


const posts = [
    {
        id: 1,
        user: {
          username: 'Darkstar',
          avatar: 'https://www.carscoops.com/wp-content/uploads/2019/09/771ea1bd-laferrari-1.jpg',
          slug: 'darkstar'
        },
        slug: 'darkstar-postId1',
        numPlays: 1679146184,
        numLikes: 1111,
        numComments: 1239,
        caption: 'Caption is super gay bro',
        media: 'https://unsplash.com/photos/4hluhoRJokI/download?force=true',
        type: 'img'
    },
    {
        id: 2,
        user: {
          username: 'Kevin Levin',
          avatar: 'https://i.pinimg.com/474x/5f/48/6b/5f486b66065fa6b535e83259d0bfb6dc.jpg',
          slug: 'kevin-levin'
        },
        slug: 'kevin-levin-postId1',
        numPlays: 16338,
        numLikes: 392,
        numComments: 948,
        caption: "He's just a big green blowhard",
        media: 'https://www.youtube.com/embed/O8PfzVWVUHk',
        type: 'video'
    },
]


function HomePage() {
    return (
        <>
            <div className='homepage__left'>
                {posts.map(post => (
                    <div key={post.id}>
                        <Home
                            slug={post.slug}
                            user={post.user}
                            numPlays={post.numPlays}
                            numLikes={post.numLikes}
                            numComments={post.numComments}
                            caption={post.caption}
                            media={post.media}
                            video={post.type === 'video' ? true : false}
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

export default HomePage;
