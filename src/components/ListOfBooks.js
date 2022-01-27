import {useState, useEffect} from "react"
import React from "react"
import _ from 'lodash'
import Book from './Book'
function ListOfBooks() {
    const axios=require('axios')
    const [books, setBooks] = useState([])


    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:5000/api/book"
        }).then((response) => setBooks(response.data))
            .catch((err) => console.log(err))

    }, [])

    const sortByTitle = () => {
        setBooks(_.sortBy(books, ['title']))
    }
    const sortByDate = () => {
        setBooks(_.sortBy(books,['release_date']))

    }
    const sortById = () => {
        setBooks(_.sortBy(books,['id']))

    }
    return (
        <div className="books-list">
            <h3>obecna Lista książek</h3>
            <div className="sortCheckboxes">
                <div className="sortInfo">Sortuj wg: </div>
                <div className="sortInputs">
                    <div className="inputAndLabel">
                        <input type="radio" onClick={sortById} name="sort"  />
                        <label htmlFor="sortTitle">id</label>
                    </div>
                    <div className="inputAndLabel">
                        <input type="radio" onClick={sortByTitle} name="sort" />
                        <label htmlFor="sortTitle">title</label>
                    </div>
                    <div className="inputAndLabel">
                        <input type="radio" onClick={sortByDate} name="sort" />
                        <label htmlFor="sortDate">date</label>
                    </div>
                </div>
            </div>
            <div className="books-flex">
                {books.map((book) =>
                    <Book key={book.id} {...book} setBooks={setBooks} books={books}/>
                )}
            </div>
        </div>

    )

}

export default ListOfBooks;