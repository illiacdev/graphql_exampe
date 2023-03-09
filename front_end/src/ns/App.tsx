import React, {Component} from 'react';
import {Button, Input} from "antd";
import axios from "axios";

class App extends Component {
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {

    }

    file = {};
    render() {
        return (
            <div>
                <Input type={"file"} onChange={(e:any)=>{

                    this.file = e.target.files[0];
                    console.log('this.file',this.file)
                }}/>
                <Button onClick={()=>{

                    // let blob = new Blob(this.file);
                    let formData = new FormData();
                    formData.append("file", this.file);
                    axios.post("/api/upload",formData,{headers: {"Content-Type": "multipart/form-data"}}).then(value => {
                        console.log(value.data);
                    }).catch(reason => {
                        console.log(reason);
                    })
                }
                }>전송</Button>
            </div>
        );
    }
}

export default App;