import {Button, Card} from "react-bootstrap";
import React from "react";
import {useState} from "react";
import {NavLink} from 'react-router-dom';




function BookDetails(props) {
    const [shouldDelete,setShouldDelete] = useState(false)
    const [shouldEdit, setShouldEdit] = useState(false)
    const onEdit = () => {
       setShouldEdit(!shouldEdit)


    }
    const link = {
        pathname: "/edit",
        id: props.id,
        title: props.title,
        author: props.author,
        genre: props.genre,
        release_date: props.release_date,
        description: props.description,
        image_url: props.image_url,
        shouldEdit: shouldEdit,
        onEdit: onEdit
    }
    

    return (
        <div>
            {shouldDelete ?
                <Card className="book">
                    <Card.Img variant="top" src={props.image_url} alt="brak zdjecia" className="book-image-size"/>
                    <Card.Body>
                        <Card.Title className="book-title">{props.title}</Card.Title>
                        <div className="book-details">
                            <div>Autor: <span className="book-author">{props.author}</span></div>
                            <div>Gatunek: {props.genre}</div>
                            <div>Data powstania: {new Date(props.release_date).toLocaleDateString()}</div>
                            <div>Opis: {props.description}</div>
                            <div>Ocena: {props.rating_count}</div>
                        </div>
                        <p>Czy na pewno chcesz usunąć tę książkę?</p>
                        <Button variant="danger" onClick={props.onDelete}>Tak</Button>
                        <Button variant="info" onClick={() => setShouldDelete(!shouldDelete)}>Nie</Button>

                    </Card.Body>
                </Card>

                :
                <Card className="book">
                    <Card.Img variant="top" src={props.image_url} alt="brak zdjecia" className="book-image-size"/>
                    <Card.Body>
                        <Card.Title className="book-title">{props.title}</Card.Title>
                        <div className="book-details">
                            <div>Autor: <span className="book-author">{props.author}</span></div>
                            <div>Gatunek: {props.genre}</div>
                            <div>Data powstania: {new Date(props.release_date).toLocaleDateString()}</div>
                            <div>Opis: {props.description}</div>
                            <div>Ocena: {props.rating_count}</div>
                        </div>
                        <NavLink to={link}> <Button variant="warning" onClick={onEdit}>Edit</Button></NavLink>
                        <Button variant="danger" onClick={() => setShouldDelete(!shouldDelete)}
                                className="bookButtons">Delete</Button>
                        <Button variant="info" onClick={props.showDescription}>Hide details</Button>

                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default BookDetails;