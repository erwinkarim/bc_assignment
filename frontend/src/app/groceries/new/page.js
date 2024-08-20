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
	const [grocery, setGrocery] = useState({ name:'', brand:'', upc12:'' });

  // should return 
  return <Row>
    <Col xs={12}>
      <h2>Create New Item</h2>
    </Col>
    <Col>
      <GroceryCardForm item={grocery} mode={'new'} />
    </Col>
  </Row>
}