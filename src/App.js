import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import loader from './loader.svg';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



function App() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios({
            method: 'GET',
            url: 'https://nazarov-kanban-server.herokuapp.com/card'
        }).then(res => {
            setList(res.data);
            setIsLoading(false);
        })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])
    return (
        <Router>
            <Switch>
                <Route path="/about">
                    About
                </Route>
                <Route path="/users">
                   Topics
                </Route>
                <Route path="/">
                    Home
                </Route>
            </Switch>
            <button>Add counter</button>
            {isLoading
                ? <img src={loader} alt=""/>
                : (<ul>
                        {
                            list.map(el => <li key={el._id}>{el.name}</li>)
                        }
                    </ul>
                )
            }
        </Router>
    );
}

export default App;
