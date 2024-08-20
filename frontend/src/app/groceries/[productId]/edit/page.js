'use client'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import GroceryCardForm from '@/app/grocery_card_form';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'

export default function Page() {
	const params = useParams();
	const [grocery, setGrocery] = useState({});
  const [loaded, setLoaded] = useState(false);


	useEffect(() => {
		console.log('load with params', params.productId);
    if(!loaded){
      fetch(`http://localhost:5001/groceries/${params.productId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('result', data);
          setGrocery(data.results);
          setLoaded(true);
        });
    }
	}, [grocery, loaded]);

  let returnPath = "/groceries/" + params.productId;

  // should return 
  return <Row>
    <Col xs={12}>
      <h2>Updating item</h2>
    </Col>
    <Col>
      <GroceryCardForm item={grocery} />
    </Col>
  </Row>
}