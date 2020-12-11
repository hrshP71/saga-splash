import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import Button from '../Button';
import Stats from '../Stats';

import './styles.css';


const ImageGrid = ({ images, error, isLoading, loadImages, imageStats }) => {
    // loadImages();
    useEffect(() => {
        loadImages();
    }, []);
    return (
        <div className="content">
            <section className="grid">
                {images.map(image => (
                    <div
                        key={image.id}
                        className={`item item-${Math.ceil(
                            image.height / image.width,
                        )}`}
                    >
                        <Stats stats={imageStats[image.id]} />
                        <img
                            src={image.urls.small}
                            alt={image.user.username}
                        />
                    </div>
                ))}

            </section>
            {error && <div className='error'>{JSON.stringify(error)}</div>}
            <Button onClick={() => !isLoading && loadImages()}
                loading={isLoading}
            >Load More</Button>
        </div>
    );
}


const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
    isLoading,
    images,
    error,
    imageStats,
});

const mapDispatchToProps = dispatch => ({
    loadImages: () => dispatch(loadImages()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ImageGrid);
