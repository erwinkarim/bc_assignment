'use client'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form, FormControl } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { Formik } from 'formik';
import * as yup from 'yup';


export default function GroceryCardForm({item, mode = 'update'}){

	let primaryButtonLabel = mode == 'update' ? 'Update' : 'Create';
	let returnPath = mode == 'update' ? `/groceries/${item.id}` : '/';
	let sendPath = mode == 'update' ? `/groceries/${item.id}` : '/groceries';
	let sendMethod = mode == 'update' ? 'POST' : 'PUT';

	const router = useRouter();

	const schema = yup.object().shape({
		brand: yup.string().required('Required'),
		name: yup.string().required(),
		upc12: yup.number().required().integer().positive(),
	});
	const initialValues = {
		brand: item.brand, name: item.name, upc12: item.upc12,
	};

	/*
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: { brand: item.brand, name: item.name, upc12: item.upc12 },
		onSubmit: (values) => { handlePrimary(values) }, 
		validationSchema: schema,
		mapPropsToErrors: true,
	});
	*/

	/*
		when primary button is clicked
	*/
	function handlePrimary(values){
		console.log('primary button clicked', values);
		let body = new FormData()
		body.append('brand', values.brand);
		body.append('name', values.name);
		body.append('upc12', values.upc12);

		// depending on mode, either update or create
		// if success, go to the page of the product
		// otherwise, some error message
		fetch(`http://localhost:5001${sendPath}`, { method: sendMethod, body })
			.then((res) => res.json())
			.then((data) => {
				// show new page
				router.push(`/groceries/${data.results.id}`);
			});

	}

	return (
		<Card>
			<Card.Body>
				<Formik
					enableReinitialize={ true }
					mapPropsToErrors={ true }
					initialValues={ initialValues }
					onSubmit={(values) => { handlePrimary(values); }}
					validationSchema={schema}
					validateOnMount={ true }
				>
					{({ values, errors, handleChange, handleSubmit, isValid, dirty }) => (
						<Form onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Brand</Form.Label>
								<Form.Control type="text" 
									placeholder='Brand Name'
									name="brand" value={values.brand} onChange={handleChange} 
									isInvalid={!!errors.brand}
								/>
								<Form.Control.Feedback type='invalid'>
									Brand field cannot be empty
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control type="text" 
									placeholder='Product Name'
									name="name" value={values.name} onChange={handleChange} 
									isInvalid={!!errors.name}
								/>
								<Form.Control.Feedback type='invalid'>
									Product name cannot be empty
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Name</Form.Label>
									<Form.Control type="number" 
										placeholder='UPC'
										name="upc12" value={values.upc12} onChange={handleChange} 
										isInvalid={!!errors.upc12}
									/>
									<Form.Control.Feedback type='invalid'>
										UPC12 must only be numbers and cannot be empty
									</Form.Control.Feedback>
							</Form.Group>
							<div class="mt-2">
								<Button className="me-2" disabled={!isValid} type='submit'>{primaryButtonLabel}</Button>
								<Button variant='secondary' href={returnPath}>Cancel</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Card.Body>
		</Card>
	)
}
