const express = require('express')
const ToDoos = require('../models/todoos')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/todoos',auth,async(req,res)=>{
    const todoos = new ToDoos({...req.body,createdBy:req.user._id})
    try{
        await todoos.save()
        res.status(200).send(todoos)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// get all

router.get('/todoos',auth,async(req,res)=>{

    try{
       await req.user.populate('todoos').execPopulate()
       res.send(req.user.todoos)
      
    }
    catch(e){
        console.log(e)
        res.status(500).send(e)
    }
})


// get by id

router.get('/todoos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        
        const todoos = await ToDoos.findOne({_id,createdBy:req.user._id})
        if(!todoos){
            return res.status(404).send('todoo is not found')
        }
        res.status(200).send(todoos)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// patch
router.patch('/todoos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        const todoos = await ToDoos.findOne({_id,createdBy:req.user._id})
        if(!todoos){
            return res.status(404).send('todoo is not found')
        }
        updates.forEach((update)=> todoos[update] = req.body[update])
        await todoos.save()
        res.send(todoos)
    }
    catch(e){
        res.status(400).send(e)
    }

})

// Delete
router.delete('/todoos/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const todoos = await ToDoos.findOneAndDelete({_id,createdBy:req.user._id})
        if(!todoos){
            return res.status(404).send('todoo is not found')
        }
        res.send(todoos)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router