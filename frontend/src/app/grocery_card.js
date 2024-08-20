'use client'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Barcode from 'react-barcode';

export default function GroceryCard({item, mode='list'}){
	let name = item.name;
	let detailButton = mode == 'list' ? (
		<div className=''>
			<Button className='me-2' href={`/groceries/${item.id}`}>Detail</Button>
			<Button className='ml-2' variant='secondary' href={`/groceries/${item.id}/edit`}>Edit</Button>
		</div>
	) : null;

	return (
		<Card>
			<Card.Body>
				<Card.Title>{item.id} - {item.name} - {item.brand}</Card.Title>
				<Card.Text><Barcode value={item.upc12}></Barcode></Card.Text>
				{ detailButton }
			</Card.Body>
		</Card>
	)
}
