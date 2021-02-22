import React, { useState, useEffect, useRef } from 'react';
import '../Styles/searchbar.css';

// Redux
import { connect } from 'react-redux';
import { searchUser } from '../redux/actions/general';

// Material Ui
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';


function Searchbar({ searchUser, users }) {
    const [search, setSearch] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [clicked, setClicked] = useState(false);
    const [active, setActive] = useState(false);
    const searchRef = useRef();

    const handleType = e => {
        setSearch(e.target.value);
        setPageNumber(1);
    }

    const handleAutoCompleteClick = user => {
        const username = document.getElementById(user).childNodes[1].childNodes[0].innerText.substring(1)
        setClicked(true);
        setSearch(username)
    }

    useEffect (() => {
        if (search) {
            if (clicked) {
                setActive(false)
            } else {
                setActive(true)
            }
        } else {
            setActive(false)
        }
        searchUser(search, pageNumber);
    }, [search, clicked, pageNumber])

    useEffect(() => {
        const handleClickOutside = e => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setActive(false);
            } else {
                setActive(true)
            }
        }
        // This is gonna run the handleClickOutside function if we click outside the ref
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`${active ? "searchActive" : "searchInActive"}`}>
            <div className='search-wrapper'>
                <div ref={searchRef} className="search-input">
                    <div className="searchBar">
                        <SearchIcon />
                        <input autoComplete="off" id="search" value={search} onChange={e=>handleType(e)} type='text' placeholder='Search something...' />
                        <label htmlFor="search">Search</label>
                    </div>
                    <div className="searchAuto">
                        {active ? (
                            <div>
                                {users.map(user => (
                                    <li id={user.user} key={user.user} onClick={() => handleAutoCompleteClick(user.user)}>
                                        <Avatar src={user.avatar} />
                                        <div className="search__text">
                                            <span>@{user.user}</span>
                                            <span>{user.full_name}</span>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.general.searchedUsers.results
})

export default connect(mapStateToProps, { searchUser })(Searchbar);
