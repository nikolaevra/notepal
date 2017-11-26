import React from 'react';
import Auth from '../modules/Auth.jsx';
import Editor from '../components/Editor.jsx';


class EditorPage extends React.Component {

    /**
     * Class constructor.
     */
    constructor(props) {
        super(props);

        this.state = {
            file: ''
        };
    }

    /**
     * This method will be executed after initial rendering.
     */
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/editor' + this.formatParams({file: "firstfile"}));
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
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

    /**
     * Render the component.
     */
    render() {
        return (<Editor secretData={this.state.secretData} />);
    }

}

export default EditorPage;
