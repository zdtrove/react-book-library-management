import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function ModalCommon({ isShowModal, modalContent }) {
    return (
        <div className={isShowModal ? "modal-overlay" : "modal-overlay modal-hide"}>
            {modalContent}
        </div>
    )
}

ModalCommon.propTypes = {
    isShowModal: PropTypes.bool,
    modalContent: PropTypes.object
}

const mapStateToProps = state => ({
    modalContent: state.ui.modalContent,
    isShowModal: state.ui.isShowModal
})

export default connect(mapStateToProps)(ModalCommon)
