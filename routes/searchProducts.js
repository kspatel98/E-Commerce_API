const Product=require("../models/product");
const express=require("express");
const router=express.Router();

router.get("/",async(req,res)=>{
    try {
        const name=req.body.name;
        const result=await Product.find({"name":{$regex:".*"+name+".*",$options:"i"}});
        if(result.length>0)
        {
            res.status(200).send({message:"Products found successfully...",data:result});
        }
        else
        {
            res.status(200).send({message:"Cannot find products.."});
        }
    } catch (error) {
        res.status(400).send({message:error.message});
    }
})
module.exports=router;