const express = require('express');
const router = express.Router();

// Get All Subscribres
router.get('/',(req,res)=>{
    res.send('hello world')
});

// Get Subscribre by id
router.get('/:id',(req,res)=>{
    res.send(req.params.id)
});

// Add Subscribre
router.post('/:id',(req,res)=>{
    
});

// Update Subscribre
router.patch('/:id',(req,res)=>{

});

// Delete Subscribre
router.delete('/:id',(req,res)=>{

});


module.exports = router