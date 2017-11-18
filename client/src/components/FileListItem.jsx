import React, { PropTypes } from 'react';
import {ListItem} from 'material-ui/List';

const FileListItem = ({
                          file,
                          onClick
                      }) => (
    <ListItem primaryText={file} onClick={onClick}/>
);

FileListItem.propTypes = {
    file: PropTypes.string.isRequired
};

export default FileListItem;