import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {NavLink} from 'react-router-dom';
import {AiOutlineWarning} from "react-icons/ai";

const EditBook = (props) => {


    const axios=require('axios')
    const [book,setBook] = useState({
        title:  props.location.title ? props.location.title : '',
        author:  props.location.author ? props.location.author : '',
        genre: props.location.genre ? props.location.genre : '',
        release_date: props.location.release_date ? formatDate(new Date(props.location.release_date)) : '',
        description: props.location.description ? props.location.description : '',
        image_url: props.location.image_url ? props.location.image_url: ''



    })

    const [errorMessage, setErrorMessage] = useState('')

    const { title,
        author,
        genre,
        release_date,
        description,
        image_url,
        } = book;

    const handleOnEdit = (event) => {
        console.log(event)
        event.preventDefault();
        const values = [
            title,
            author,
            genre,
            release_date,
            description,
            image_url
        ];

        let errorMessage = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0' && value !== undefined;
        });

        if (allFieldsFilled) {
            if (new Date(release_date) > new Date()) {
                errorMessage='Data nie może być starsza niż dzisiejsza'
                setErrorMessage(errorMessage)
            }
            else {
                const book = {

                    title,
                    author,
                    genre,
                    release_date,
                    description,
                    image_url

                };
                event.preventDefault()
                axios.put('http://localhost:5000/api/book/'+props.location.id,book)
                    .then(() => alert("Pomyślnie edytowano książkę"))
                    .then(() => window.location = '/');
            }
        } else {
            errorMessage = 'Please fill out all the fields.';
        }
        setErrorMessage(errorMessage);
    };



    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setBook((prev) => ({...prev, [name]: value}));

    }


    const data = props.location.release_date
    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() +1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }


    const dataDobra = formatDate(data)

    return (
    <div className="form">
        {errorMessage && <p className="errorMsg"><AiOutlineWarning />{errorMessage}</p>}
            <Form onSubmit={handleOnEdit}>


                <Form.Group controlId="nazwa">
                    <Form.Label>Wprowadź tytuł książki</Form.Label>
                    <Form.Control className="control-input" type="text" name="title" defaultValue={props.location.title} placeholder="Tu edytuj tytuł" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="autor">
                    <Form.Label>Wprowadź autora książki</Form.Label>
                    <Form.Control className="control-input" type="text" name="author" defaultValue={props.location.author} placeholder="Tu edytuj autora" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="genre">
                    <Form.Label>Wprowadź gatunek książki</Form.Label>
                    <Form.Control className="control-input" type="text" name="genre" defaultValue={props.location.genre} placeholder="Tu edytuj gatunek" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="releaseDate">
                    <Form.Label>Wprowadź datę powstania książki</Form.Label>
                    <Form.Control className="control-input" type="date" name="release_date" defaultValue={dataDobra} placeholder="Tu edytuj datę powstania" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Wprowadź opis książki</Form.Label>
                    <Form.Control className="control-input" type="text" name="description" defaultValue={props.location.description} placeholder="Tu zmień opis" size="30" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="imageurl">
                    <Form.Label>Wprowadź adres URL do zdjęcia książki</Form.Label>
                    <Form.Control className="control-input" type="text" name="image_url" defaultValue={props.location.image_url} placeholder="Tu zmień adres do zdjęcia" size="30" onChange={handleInputChange} />
                </Form.Group>



                <Button type="submit" variant="primary" className="submitButton bookButtons">Submit</Button>
                <NavLink to="/"><Button variant="info">Don't edit</Button></NavLink>





            </Form>
    </div>
    );
};

export default EditBook;