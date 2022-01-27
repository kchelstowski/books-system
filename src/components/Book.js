import {Card, Button} from "react-bootstrap";
import React from "react";
import {useState} from 'react'
import BookDetails from "./BookDetails";
import _ from "lodash";

function Book(props) {
    const [shouldShowDescription, setShouldShowDescription] = useState(false)
    const axios = require('axios')
    const onDelete = () => {
        axios.delete('http://localhost:5000/api/book/'+props.id).then((response) => {
        }).then(props.setBooks(_.filter(props.books, book => book.id !== props.id)))
    }
    const showDescription = () => {
        setShouldShowDescription(!shouldShowDescription)


    }

    return (
        <div>
            {shouldShowDescription ? <BookDetails {...props} showDescription={showDescription} onDelete={onDelete}/>  : <Card className="book">
                <Card.Img variant="top" src={props.image_url} alt="brak zdjecia" className="book-image-size"/>
                <Card.Body>

                    <Card.Title className="book-title">{props.title}</Card.Title>

                    <Button variant="info" onClick={showDescription} className="bookButtons">Show details</Button>
                </Card.Body>
            </Card>}

        </div>
    )
}

export default Book;