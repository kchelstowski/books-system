import {Form, Button} from 'react-bootstrap'
import {useEffect, useState} from "react"
import {AiOutlineWarning} from 'react-icons/ai'
function BooksForm(props) {
    const axios = require('axios')
    const _ = require('lodash')
    const [books, setBooks] = useState([])
    const [booksHelper,setBooksHelper] = useState([])


    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/api/book"
        }).then((response) => setBooks(response.data))
            .catch((err) => console.log(err))

    }, [])



    const [book,setBook] = useState({
        title:  props.title ? props.title : '',
        author:  props.author ? props.author : '',
        genre: props.genre ? props.genre : '',
        release_date: props.release_date ? props.release_date : '',
        description: props.description ? props.description : '',
        image_url: props.image_url ? props.image_url: ''



    })

    const [errorMessage, setErrorMessage] = useState('')

    const { title,
        author,
        genre,
        release_date,
        description,
    image_url,
        } = book;

    const handleOnSubmit = (event) => {
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

            else if ((_.find(books, {'title': title}) instanceof Object) || booksHelper.filter(x => x === title).length >=1) {
                errorMessage="Nie można dodać książki o takim tytule! Już taka istnieje!"
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
                props.handleOnSubmit(book);

                setBooksHelper((prev) => [...prev, title])
               // console.log(booksHelper)
                setBook({
                    title: "",
                    author: "",
                    genre: "",
                    release_date: "",
                    image_url: '',
                    description: ""

                })


            }
        } else {
            errorMessage = 'Proszę uzupełnić wszystkie pola!';
        }
        setErrorMessage(errorMessage);
    };



    const handleInputChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setBook((prev) => ({...prev, [name]: value}));

    }





    return (
        <div className="form">
            {errorMessage && <p className="errorMsg"><AiOutlineWarning />{errorMessage}</p>}



           <Form onSubmit={handleOnSubmit}>
                    <Form.Group controlId="nazwa">
                        <Form.Label>Wprowadź tytuł książki</Form.Label>
                        <Form.Control className="control-input" type="text" name="title" value={title} placeholder="Tu wpisz tytuł" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="autor">
                        <Form.Label>Wprowadź autora książki</Form.Label>
                        <Form.Control className="control-input" type="text" name="author" value={author} placeholder="Tu wpisz autora" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="genre">
                        <Form.Label>Wprowadź gatunek książki</Form.Label>
                        <Form.Control className="control-input" type="text" name="genre" value={genre} placeholder="Tu wpisz gatunek" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="releaseDate">
                        <Form.Label>Wprowadź datę powstania książki</Form.Label>
                        <Form.Control className="control-input" type="date" name="release_date" value={release_date} placeholder="Tu wpisz datę powstania" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Wprowadź opis książki</Form.Label>
                        <Form.Control className="control-input" type="text" name="description" value={description} placeholder="Tu daj opis" size="30" onChange={handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="imageurl">
                        <Form.Label>Wprowadź adres URL do zdjęcia książki</Form.Label>
                        <Form.Control className="control-input" type="text" name="image_url" value={image_url} placeholder="Tu wprowadź adres URL do zdjęcia" size="30" onChange={handleInputChange} />
                    </Form.Group>



                    <Button type="submit" variant="primary" className="submitButton">Submit</Button>






                </Form>
            


        </div>
    )



}

export default BooksForm;