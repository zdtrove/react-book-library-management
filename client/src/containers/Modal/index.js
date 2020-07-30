import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function ModalContainer({ isShowModal, modalContent }) {
    return (
        <div className={isShowModal ? "modal-overlay" : "modal-overlay modal-hide"}>
            {modalContent}
        </div>
    )
}

ModalContainer.propTypes = {
    isShowModal: PropTypes.bool,
    modalContent: PropTypes.object
}

const mapStateToProps = state => ({
    modalContent: state.ui.modalContent,
    isShowModal: state.ui.isShowModal
})

export default connect(mapStateToProps)(ModalContainer)
