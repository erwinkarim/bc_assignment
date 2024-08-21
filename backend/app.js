const express = require('express')
const cors = require('cors')
const app = express()
const multer = require('multer');
const upload = multer();
const port = 3000

const { Sequelize, DataTypes } = require('sequelize');

// setup database
// const sequelize = new Sequelize('mysql://mama_bear:password@localhost:3306/bc_assignment'); 
const sequelize = new Sequelize('mysql://root:123456@mysqldb:3306/bc_assignment'); 
const Grocery = sequelize.define('grocery', {
  id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  brand: DataTypes.STRING,
  name: DataTypes.STRING,
  upc12: DataTypes.BIGINT,
});

// db connection test
let connTest = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

/*
  setup
  - cors
  - handle multipart/form-data
*/ 
app.use(cors());
app.use(upload.array()); 
app.use(express.static('public'));

// index
app.get('/', async (req, res) => {
  console.log('loading root page');
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.send('Hello World!')
});

// show groceries
app.get('/groceries', async (req, res) => {
  console.log('getting all groceries');

  let groceries = await Grocery.findAll({
    order: [
      [ 'name', 'ASC' ]
    ]
  });

  // params to determine ordering
  res.json({
    msg: 'found groceries',
    results: groceries,
  });
});

// create new grocery item
app.put('/groceries', async (req,res) => {
  console.log('creating new groceries', req.body);
  let grocery = await Grocery.create(req.body);

  res.json({
    msg: 'success',
    results: grocery,
  })
});


// get specific grocery
app.get('/groceries/:productId', async (req, res) => {
  let grocery = await Grocery.findOne({where: {id: req.params.productId} });

  // params to determine ordering
  res.json({
    msg: 'found groceries',
    results: grocery,
  });
  // res.send(`looking for ${req.params.productId}`);
});

// update groceries
app.post('/groceries/:productId', async (req, res) => {
  let grocery = await Grocery.findOne({id: req.params.productId});
  await grocery.update(req.body);

  console.log('updating grocery', req.params.productId, req.body);
  res.json({
    msg: 'success',
    results: grocery,
  })
});

// delete grocery item
app.delete('/groceries/:productId', async (req, res) => {
  console.log('delete grocery item', req.params.productId);
  
  await Grocery.destroy({
    where: {
      id: req.params.productId,
    }
  });

  res.json({
    msg: 'success',
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})