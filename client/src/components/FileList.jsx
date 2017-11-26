import React from 'react';
import FileListItem from "./FileListItem.jsx";
import {List} from 'material-ui/List';

const FileList = (props) => {
    const fileItems = props.files.map((file) => {
        return (
            <FileListItem
                onFileSelect={props.onFileSelect}
                key={file.id}
                file={file}/>
        );
    });

    return (
        <List >
            {fileItems}
        </List>
    );
};

export default FileList;