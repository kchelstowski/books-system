const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const messages = {
    TITLE_DUPLICATE: 'TITLE_DUPLICATE',
    INCORRECT_RATING_SCORE: 'INCORRECT_RATING_SCORE',
    ELEMENT_NOT_EXIST: 'ELEMENT_NOT_EXIST'
};

app.get('/api/book', async (req, res) => {
    const result = await client.query("SELECT * FROM book");
    const books = result.rows.map(book => {
        book.rating = book.rating_sum ? book.rating_sum / book.rating_count : null;
        delete book.rating_count;
        delete book.rating_sum;
        return book;
    })

    return res.send(books);
});

app.get('/api/book/:id', async (req, res) => {
    const id = req.params.id;

    const bookRows = await client.query("SELECT * FROM book WHERE id = $1", [id]); 

    const book = bookRows.rows[0];

    if(book) {
        book.rating = book.rating_sum ? book.rating_sum / book.rating_count : null;
        delete book.rating_count;
        delete book.rating_sum;
    }

    return res.send(book);
  });

app.post('/api/book', async (req, res) => {
    const bookToAdd = req.body;
    const duplicate = await client.query("SELECT * FROM book WHERE title = $1", [ bookToAdd.title ]);

    if(duplicate.rows[0]) {
        return res.status(500).send(messages.TITLE_DUPLICATE);
    }

    const insertedBookRows = await client.query(
        "INSERT INTO book (title, author, genre, release_date, description, image_url, rating_count, rating_sum) VALUES ($1, $2, $3, $4, $5, $6, 0, NULL) RETURNING *",
        [bookToAdd.title, bookToAdd.author, bookToAdd.genre, bookToAdd.release_date, bookToAdd.description, bookToAdd.image_url]
      );

    const insertedBook = insertedBookRows.rows[0];
    insertedBook.rating = null;
    delete insertedBook.rating_count;
    delete insertedBook.rating_sum;
    return res.send(insertedBook);  
});


app.post('/api/book/:id/rate', async (req, res) => {
    const id = req.params.id;
    const score = +req.body.score;
  
    const book = await client.query("SELECT * FROM book WHERE id = $1", [ id ]);
  
    if (!book.rows[0]) {
      return res.status(500).send(messages.ELEMENT_NOT_EXIST);
    } else {
      if (score < 1 || score > 5) {
          return res.status(500).send(messages.INCORRECT_RATING_SCORE);
      } else {
        const bookFromDb = book.rows[0];
        try {
            const newRatingCount = bookFromDb.rating_count + 1;
            const newRatingSum = bookFromDb.rating_sum + score;

          await client.query("UPDATE book SET rating_count=$1, rating_sum=$2 WHERE id = $3", 
          [newRatingCount, newRatingSum, id]);
          bookFromDb.rating = newRatingSum/ newRatingCount;
          delete bookFromDb.rating_count;
          delete bookFromDb.rating_sum;

          return res.send(bookFromDb);
        } catch(ex) {
          return res.status(500).send(score);
        }
      }
    }
  });


app.delete('/api/book/:id', async (req, res) => {
    const id = req.params.id;
    console.log('test');
    const response = await client.query("DELETE from book WHERE id = $1", [id]);

    return response.rowCount > 0 ? res.sendStatus(200) : res.sendStatus(400); 
});

app.put('/api/book/:id', async (req, res) => {
    const bookToAdd = req.body;
    const id = req.params.id;
    const result = await client.query(`UPDATE book SET title = $1, author = $2, genre = $3, release_date = $4, description = $5, image_url = $6 WHERE id = $7`,
        [bookToAdd.title, bookToAdd.author, bookToAdd.genre, bookToAdd.release_date, bookToAdd.description, bookToAdd.image_url, id]
    );
    
    return result.rowCount > 0 ? res.send(bookToAdd) : res.sendStatus(400);
});


require('dotenv').config();
const dbConnData = {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: 'tajne'
};

const { Client } = require('pg');
const client = new Client(dbConnData);

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');

    client.query(`CREATE TABLE IF NOT EXISTS book (
        id SERIAL PRIMARY KEY,
        title VARCHAR UNIQUE NOT NULL,
        author VARCHAR NOT NULL,
        genre VARCHAR(50) NOT NULL,
        release_date DATE NOT NULL,
        description VARCHAR NOT NULL,
        image_url VARCHAR NULL,
        rating_count INT NOT NULL,
        rating_sum INT NULL
      );`);

    const port = process.env.PORT || 5000
    app.listen(port, () => {
      console.log(`API server listening at http://localhost:${port}`);
    });
  })
  .catch(err => console.error('Connection error', err.stack));
