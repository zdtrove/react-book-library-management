import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../Errors/TextError'

const ContentModalAdd = ({ addProduct, hideModal, changeModalContent, isLoadingButton }) => {
	const initialValues = {
	    title: '',
	    price: '',
	    inStore: '',
	    image: "images/product-1.PNG",
	    inCart: false,
	    count: 0,
	    totalPrice: 0
	}

	const validationSchema = Yup.object({
	    title: Yup.string().required('Title is required').max(60, 'Max length of title is 60 characters').min(4, 'Min length of title is 4 characters'),
	    price: Yup.number().required('Price is required').max(1000, 'Max price is $1000').min(100, 'Min price is $100'),
	    inStore: Yup.number().required('Number in store is required').max(1000, 'Max product in store is 1000').min(1, 'Min product in store is 1')
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
                    <button onClick={onHideModal} className="button-products cancel" type="reset">cancel</button>
                    <button className="button-products add" type="submit">add {isLoadingButton && <span className="loader"></span>}</button>
                </div>
            </Form>
        </Formik>
    </div>
}

ContentModalAdd.propTypes = {
	addProduct: PropTypes.func.isRequired,
	hideModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default ContentModalAdd