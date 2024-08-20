'use client'

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function GroceryCard({item, mode='list'}){
	let name = item.name;
	let detailButton = mode == 'list' ? (
		<Button href={`/groceries/${item.id}`}>Detail</Button>
	) : null;

	return (
		<Card>
			<Card.Body>
				<Card.Title>{item.id} - {item.name} - {item.brand}</Card.Title>
				<Card.Text>{item.upc12}</Card.Text>
				{ detailButton }
			</Card.Body>
		</Card>
	)
}
