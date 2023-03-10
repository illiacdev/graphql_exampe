import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dev from "./Dev";
import Main from "./Main";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/dev"} element={<Dev/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
