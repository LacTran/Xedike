import React from 'react';

const landing = () => {
    return (
        <React.Fragment>
            <div className="parallax-container">
                <div className="parallax"><img src="https://source.unsplash.com/random/500x500" alt="" /></div>
            </div>
            <div className="section white">
                <div className="row container">
                    <h2 className="header">Parallax</h2>
                    <p className="grey-text text-darken-3 lighten-3">Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.</p>
                </div>
            </div>
            <div className="parallax-container">
                <div className="parallax"><img src="https://source.unsplash.com/random/300×300" alt="" /></div>
            </div>
        </React.Fragment>

    );
};

export default landing;