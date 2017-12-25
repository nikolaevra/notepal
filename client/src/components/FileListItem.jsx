import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';

const FileListItem = ({ file, onFileSelect }) => (
    <ListItem primaryText={file} onClick={() => onFileSelect(file)}/>
);

FileListItem.propTypes = {
    file: PropTypes.string.isRequired
};

export default FileListItem;