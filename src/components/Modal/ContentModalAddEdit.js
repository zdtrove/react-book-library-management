import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../Errors/TextError'

const ContentModalAddEdit = ({ addProduct, hideModal, changeModalContent, isLoadingButton }) => {
	const initialValues = {
	    title: '',
	    price: 0,
	    inStore: 0,
	    image: "images/product-1.PNG",
	    inCart: false,
	    count: 0,
	    totalPrice: 0
	}

	const validationSchema = Yup.object({
	    title: Yup.string().required('Title is required'),
	    price: Yup.number().required('Price is required'),
	    inStore: Yup.number().required('Number in store is required')
	})

	const onSubmit = values => {
	    addProduct(values)
	}

    const onHideModal = () => {
        hideModal()
        changeModalContent()
    }

	return <div className="popup-product">
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form>
                <h3>Add book</h3>

                <div className="form-control">
                    <label>Title</label>
                    <Field className="input-text" name="title" type="text" placeholder="Title" />
                    <ErrorMessage name="title" component={TextError} />
                </div>

                <div className="form-control">
                    <label>Price</label>
                    <Field className="input-text" name="price" type="number" placeholder="Price" />
                    <ErrorMessage name="price" component={TextError} />
                </div>
                
                <div className="form-control">
                    <label>Number in store</label>
                    <Field className="input-text" name="inStore" type="number" placeholder="Number in store" />
                    <ErrorMessage name="inStore" component={TextError} />
                </div>
                
                <div className="wrap-button">
                    <button onClick={() => onHideModal()} className="button-products cancel" type="reset">cancel</button>
                    <button className="button-products add" type="submit">add {isLoadingButton && <span className="loader"></span>}</button>
                </div>
            </Form>
        </Formik>
    </div>
}

ContentModalAddEdit.propTypes = {
	addProduct: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default ContentModalAddEdit