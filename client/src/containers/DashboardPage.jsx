import React from 'react';
import Auth from '../modules/Auth.jsx';
import Dashboard from '../components/Dashboard.jsx';
import FileListItem from '../components/FileListItem.jsx';


class DashboardPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            secretData: ''
        };
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // set the authorization HTTP header
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log(xhr.response);
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
        let filesList = this.state.files.map(function(name){
            return <FileListItem>{name}</FileListItem>;
        });
        return (<Dashboard children={filesList} />);
    }

}

export default DashboardPage;
