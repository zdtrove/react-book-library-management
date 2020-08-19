import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from '../Errors/TextError'
import axios from 'axios'

const ContentModalAdd = ({ addBook, hideModal, changeModalContent, isLoadingButton }) => {
    const initialValues = {
        title: '',
        price: '',
        inStore: '',
        image: "images/book-1.PNG",
        inCart: false,
        count: 0,
        totalPrice: 0
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required').max(60, 'Max length of title is 60 characters').min(4, 'Min length of title is 4 characters'),
        price: Yup.number().required('Price is required').max(1000, 'Max price is $1000').min(100, 'Min price is $100'),
        inStore: Yup.number().required('Number in store is required').max(1000, 'Max book in store is 1000').min(1, 'Min book in store is 1')
    })

    const onSubmit = async values => {
        let data = new FormData();

        data.append('image', values.image);
        data.append('title', values.title);
        data.append('price', values.price);
        data.append('inStore', values.inStore);
        // values.image = data;
        // console.log(values);

        // addBook(values)
        let url = `http://localhost:5000/api/books/book`
        return await axios.post(url, data, {
            headers: { 
                Authorization: localStorage.getItem('blmToken'),
                'Content-Type': 'multipath/form-data'
            }
        })
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
            {
                formProps => (
                    <Form>
                        <h3>Add book</h3>

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

                        <div className="form-control">
                            <label>Book image</label>
                            <input className="ipt" name="image" type="file" onChange={evt => formProps.setFieldValue('image', evt.target.files[0])} />
                            <ErrorMessage name="image" component={TextError} />
                        </div>
                        
                        <div className="wrap-button">
                            <button onClick={onHideModal} className="btn cancel" type="reset">cancel</button>
                            <button className="btn add" type="submit">add {isLoadingButton && <span className="loader"></span>}</button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </div>
}

ContentModalAdd.propTypes = {
    addBook: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    changeModalContent: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool
}

export default ContentModalAdd