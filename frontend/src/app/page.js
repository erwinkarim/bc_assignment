'use client'

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { FormLabel, FormControl } from 'react-bootstrap';
import GroceryCard from './grocery_card';
import { useEffect, useState } from 'react';

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  // fetch items from backend
  const [originalList, setOriginalList] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [sortMode, setSortMode] = useState(0);
  const [sortText, setSortText] = useState('id')
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    if(!loaded){
      fetch('http://localhost:5001/groceries')
        .then((res) => res.json())
        .then((data) => {
          setGroceries(data.results);
          setOriginalList(data.results);
          setLoaded(true);
          // console.log('groceries', groceries);
        });
    }

  }, [groceries]);

  function sortGroceries(){
    sortMode > 1 ? setSortMode(0) : setSortMode(sortMode+1);

    console.log('sortMode', sortMode);

    // sort either by unsorted, a-z, or z-a
    const newGroceries = [...groceries];

    if(sortMode == 0){
      console.log('sort by id');
      newGroceries.sort((a, b) => { return a.id < b.id ? -1 : 1; })
      setSortText('id')
    }
    if(sortMode == 1){
      console.log('sort by a-z')
      setSortText('a-z');
      newGroceries.sort((a, b) => { 
        if(a.name.toUpperCase() < b.name.toUpperCase()){
          return -1;
        }; 
        if(a.name.toUpperCase() > b.name.toUpperCase()){
          return 1;
        }; 
        return 0;
      })
    }
    if(sortMode == 2){
      console.log('sort by z-a')
      setSortText('z-a');
      newGroceries.sort((a, b) => { 
        if(a.name.toUpperCase() < b.name.toUpperCase()){
          return 1;
        }; 
        if(a.name.toUpperCase() > b.name.toUpperCase()){
          return -1;
        }; 
        return 0;
      })
    }
    setGroceries(newGroceries)
  }

  function startLooking(e){
    setSearchKeyword(e.target.value);
    const keyword = e.target.value.toUpperCase();
    // console.log('looking for keyword', keyword);
    let newGroceries = [...originalList];
    setSortMode(0);

    /*
      if keyword empty, just copy from original list
      otherwise, just filter based on brand + name.
    */
    if(e.target.value = ''){
      setGroceries(newGroceries);
    } else {
      newGroceries = newGroceries.filter((value) => {
        return value.name.toUpperCase().includes(keyword) ||
          value.brand.toUpperCase().includes(keyword);
      })
      setGroceries(newGroceries);
    }
  }

  return ( 
  <div>
      <Row>
        <Col>
          <Form className='form-inline mt-2'>
            <div className='form-group'>
              <FormControl value={searchKeyword} 
                type='text' onChange={startLooking} placeholder='Enter keyword to search ...' />
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className='bg-light p-4 my-2'>
          <Button href="/groceries/new">New</Button>
          <Button variant='link' onClick={sortGroceries}>Sort ({sortText})</Button>
        </Col>
        { groceries.length == 0 ? (<Col>Loading ...</Col>) : groceries.map((e) => { return <Col xs={12} md={6} className='mb-4'><GroceryCard item={e} /></Col> } )}
      </Row>
  </div>
  )

}