import React, { useState, useEffect } from 'react';
import '../Styles/searchbar.css';

// Material Ui
import SearchIcon from '@material-ui/icons/Search';

function Searchbar() {
    const [search, setSearch] = useState("");
    const [active, setActive] = useState(false);

    const handleType = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (search) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [search])

    return (
        <div className={`${active ? "searchActive" : "searchInActive"}`}>
            <div className='search-wrapper'>
                <div className="search-input">
                    <div className="searchBar">
                        <SearchIcon />
                        <input autoComplete="off" id="search" value={search} onChange={e=>handleType(e)} type='text' placeholder='Search something...' />
                        <label htmlFor="search">Search</label>
                    </div>
                    <div className="searchAuto">
                        {active ? (
                            <>
                                <li>DarkstarDarkstarDarkstarDarkstarDarkstarDarkstarDarkstar</li>
                                <li>Bigbunny</li>
                                <li>Darkstar</li>
                                <li>Bigbunny</li>
                                <li>Darkstar</li>
                                <li>Bigbunny</li>
                                <li>Darkstar</li>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Searchbar
