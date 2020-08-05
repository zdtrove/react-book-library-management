import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../Errors/TextError'

const ContentModalEdit = ({ book, editBook, hideModal, changeModalContent, isLoadingButton }) => {
	const initialValues = book

	const validationSchema = Yup.object({
	    title: Yup.string().required('Title is required').max(60, 'Max length of title is 60 characters').min(4, 'Min length of title is 4 characters'),
        price: Yup.number().required('Price is required').max(1000, 'Max price is $1000').min(100, 'Min price is $100'),
        inStore: Yup.number().required('Number in store is required').max(1000, 'Max book in store is 1000').min(1, 'Min book in store is 1')
	})

	const onSubmit = values => {
	    editBook(values)
	}

    const onHideModal = () => {
        hideModal()
        changeModalContent()
    }

	return <div className="popup-book">
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <h3>Edit book</h3>

                <div className="form-control">
                    <label>Title</label>
                    <Field className="ipt" name="title" type="text" placeholder="Title" />
                    <ErrorMessage name="title" component={TextError} />
                </div>

                <div className="form-control">
                    <label>Price</label>
                    <Field className="ipt" name="price" type="number" placeholder="Price" />
                    <ErrorMessage name="price" component={TextError} />
                </div>
                
                <div className="form-control">
                    <label>Number in store</label>
                    <Field className="ipt" name="inStore" type="number" placeholder="Number in store" />
                    <ErrorMessage name="inStore" component={TextError} />
                </div>
                
                <div className="wrap-button">
                    <button onClick={onHideModal} className="btn cancel" type="reset">cancel</button>
                    <button className="btn add" type="submit">edit {isLoadingButton && <span className="loader"></span>}</button>
                </div>
            </Form>
        </Formik>
    </div>
}

ContentModalEdit.propTypes = {
    book: PropTypes.object.isRequired,
	editBook: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default ContentModalEdit