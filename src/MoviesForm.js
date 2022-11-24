import React, { useRef } from "react";

import classes from './MoviesForm.module.css';

const MoviesForm = (props) => {
    const titleRef = useRef('');
    const openingTextRef = useRef('');
    const releaseDateRef = useRef('');

    const submitHandler = (event) => {
        event.preventDefault();

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDateRef.current.value
        }
        props.onAddMovie(movie);
    };

    return(
        <React.Fragment>
            <section>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" ref={titleRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="opening-text">Opening Text</label>
                        <textarea type="text" id="opening-text" rows='5'ref={openingTextRef}></textarea>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="release-date">Release Date</label>
                        <input type="text" id="release-date" ref={releaseDateRef}/>
                    </div>
                    <button>Add Movie</button>
                </form>
            </section>
        </React.Fragment>
    );
};

export default MoviesForm;