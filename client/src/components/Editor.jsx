import React, { PureComponent } from 'react'

export default class Editor extends PureComponent {
    constructor (props) {
        super();

        let fileId = props.match.fileId;
        this.state = { fileId }
    }

    componentDidMount () {
        fetch(`/file/${this.state.fileId}`)
    }
}

