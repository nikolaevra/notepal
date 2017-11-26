import React, {Component} from 'react';
import Auth from '../modules/Auth.jsx';
import FileList from "../components/FileList.jsx";
import { Card } from 'material-ui/Card';


class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            files: [],
            selectedFile: null
        };
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/getUserFiles' + this.formatParams({userId: "123456"}));
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    files: xhr.response.message
                });
            }
        });
        xhr.send();
    }

    formatParams( params ){
        return "?" + Object
            .keys(params)
            .map(function(key){
                return key+"="+encodeURIComponent(params[key])
            })
            .join("&")
    }

    render() {
        console.log(this.state.files);

        return (
            <Card className="container">
                <FileList
                    files={this.state.files}
                    onFileSelect={selectedFile => this.setState({selectedFile})}/>
            </Card>
        );
    }
}

export default DashboardPage;
