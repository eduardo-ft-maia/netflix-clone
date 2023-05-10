import React from 'react';
import './Header.css';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className='header-logo'>
                <a href='/'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/6/67/NewNetflixLogo.png'></img>
                </a>
            </div>
            <div className='header-user'>
                <a href='/'>
                    <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fih1.redbubble.net%2Fimage.618427277.3222%2Fflat%2C800x800%2C075%2Cf.u1.jpg&f=1&nofb=1&ipt=5f45487ef82c6e5cdd8231f3918b8afb9a579d097172be116d1f22a94e84f520&ipo=images' alt='User' />
                </a>
            </div>
        </header>
    )
}