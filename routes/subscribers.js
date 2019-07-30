const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber')

// Get All Subscribres
router.get('/', async (req,res)=>{
    try{
        const subscribers = await Subscriber.find();
        res.send(subscribers);
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

// Add Subscribre
router.post('/', async (req,res)=>{
    
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);

    }catch(err){
        res.status(400).json({message: err.message})
    }
});

// Get Subscribre by id
router.get('/:id',getSubscriber, async(req,res)=>{ 
    res.send(res.subscriber);
});



//  Delete Subscribre
router.delete('/:id',getSubscriber,async(req,res)=>{
    try {
        await res.subscriber.remove();
        res.json({message: 'Subsriber Deleted'});

    }catch(err){
         res.status(500).json({message: err.message})
    }
});

// Update Subscribre
router.patch('/:id',getSubscriber,async(req,res)=>{

    let messageErrors ='';
    if(!req.body.name) messageErrors= 'name is  require';
    if(!req.body.subscribedToChannel ) messageErrors += ' subscribedToChannel is require';
    if  ( messageErrors )  return res.status(400).json({message: messageErrors })
       
     
    let updateSubscriber={
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    }

    try{
     await res.subscriber.update(updateSubscriber)
     res.status(200).json({message: 'Subscriber updated'})

    }catch(err){
        res.status(500).json({message : err.message})
    }
});


// Middleware

async function getSubscriber(req,res,next){
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({message: 'Suscriber not found'})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
    res.subscriber=subscriber;
    next()
}

module.exports = router