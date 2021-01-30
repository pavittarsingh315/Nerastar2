import React, { useState } from 'react';
import '../Styles/Navbar.css';
import { Link, useHistory } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';

// Material Ui
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


function Navbar({ logout }) {
    const [search, setSearch] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/users/${search}`)
        setSearch('');
    }
    return (
        <div className='navbar'>
            <div className='navbar__left'>
                <img alt='' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' />
                <h3>Nerastar</h3>
            </div>
            <div className='navbar__center'>
                <div className='navbar__search'>
                    <SearchIcon />
                    <form onSubmit={handleSubmit}>
                        <input value={search} onChange={e=>setSearch(e.target.value)} type='text' placeholder='Search Users' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>

            <div className='navbar__right'>
                <Link to='/'>
                    <div className='navbar__icon'>
                        <Tooltip title='Home' arrow enterDelay={0} leaveDelay={25}>
                            <IconButton>
                                <HomeIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Link>
                <Link to='/create'>
                    <div className='navbar__icon'>
                        <Tooltip title='Create Post' arrow enterDelay={0} leaveDelay={25}>
                            <IconButton>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Link>
                {/* Modal */}
                <div className='navbar__icon'>
                    <Tooltip title='Notifications' arrow enterDelay={0} leaveDelay={25}>
                        <IconButton>
                            <Badge badgeContent={4} max={10}>
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className='navbar__icon'>
                    <Tooltip title='Logout' arrow enterDelay={0} leaveDelay={25}>
                        <IconButton onClick={logout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}

export default connect(null, { logout })(Navbar);
