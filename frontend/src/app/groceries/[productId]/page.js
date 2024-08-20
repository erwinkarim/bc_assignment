'use client'

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GroceryCard from '@/app/grocery_card';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'

export default function Page() {
	const params = useParams();
	const [grocery, setGrocery] = useState({});
  const [loaded, setLoaded] = useState(false);
	let itemPath = `http://localhost:5001/groceries/${params.productId}`;
	const router = useRouter();

	useEffect(() => {
		console.log('load with params', params.productId);

		if(!loaded){
			fetch(itemPath)
				.then((res) => res.json())
				.then((data) => {
					console.log('result', data);
					setGrocery(data.results);
					setLoaded(true);
				});
		}
	});

	// send to delete
	function deleteGrocery(){
		fetch(itemPath, { method: 'DELETE'})
			.then((res) => { res.json()})
			.then((data) => {
				console.log('data', data);
				router.push('/');
			})
	}

	return <Row>
		<Col xs={12} className='my-2'>
			<GroceryCard item={grocery} mode={'show'}></GroceryCard>
		</Col>
		<Col>
			<Button className='mr-2' href={`/groceries/${grocery.id}/edit`}>Edit</Button>
			<Button variant='danger' onClick={deleteGrocery}>Delete</Button>
		</Col>
	</Row>

}