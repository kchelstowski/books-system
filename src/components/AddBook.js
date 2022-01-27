import React from 'react';
import BooksForm from './BooksForm';


const AddBook = () => {

    const axios=require('axios')
    const handleOnSubmit = (book) => {
        console.log(book);






        axios({
            method: "post",
            url: 'http://localhost:5000/api/book',
            data: book
        }).then((response) => {alert("pomyślnie dodano książkę")}).catch((err) => {console.log(err)})


    };




    return (
        <React.Fragment>
            <BooksForm handleOnSubmit={handleOnSubmit} />
        </React.Fragment>
    );
};

export default AddBook;