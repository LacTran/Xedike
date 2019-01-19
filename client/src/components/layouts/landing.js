import React from 'react';

const landing = () => {
    return (
        <div>
            <div id="carouselId" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselId" data-slide-to="1"></li>
                    <li data-target="#carouselId" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <img src="./img/slide_1.jpg" alt="First slide" height ='600px' width="100%"/>
                    </div>
                    <div className="carousel-item">
                        <img src="./img/slide_2.jpg" alt="Second slide" height ='600px' width="100%" />
                    </div>
                    <div className="carousel-item">
                        <img src="./img/slide_3.jpg" alt="Third slide" height ='600px' width="100%" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
};

export default landing;