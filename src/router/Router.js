import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import AddBook from '../components/AddBook';
import ListOfBooks from '../components/ListOfBooks';
import EditBook from '../components/EditBook';

function AppRouter() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <div className="main-content">
                    <Switch>
                        <Route component={ListOfBooks} path="/" exact={true} />
                        <Route component={AddBook} path="/add" />
                        <Route component={EditBook} path="/edit" />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default AppRouter;