import React from "react";

import '../styles/Modal.css';

class Modal extends React.Component {
    constructor() {
        super();

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        // Attach event listener to document to detect button click
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        // Attach event listener to document to detect button click
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = evt => {
        // If user clicked outside of element, then close the modal
        if (this.wrapperRef && !this.wrapperRef.contains(evt.target)) {
            this.props.closeModal();
        }
    }

    /* Set the wrapper ref for the modal container div, so can detect if clicked outside */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    render() {
        /*
        props passed in: 
        elements  - array [] of elements that will be rendered onto the modal
        callbacks - array [] of callback functions when the user clicks on the
                    element that index aligns with it in elements
        */
       const {elements, callbacks, isOpened} = this.props;
       console.log(isOpened);
       if (!isOpened) return null;

       return (
            <div className="modal-container" ref={this.setWrapperRef}>
                {
                    elements && elements.length > 0 ? elements.map(element => (
                            <h4 className="element">{element}</h4>
                    )) : null
                }
            </div>
       );
    }
}

export default Modal;