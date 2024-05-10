const Product=require("../models/product");
const express=require("express");
const router=express.Router();

router.get("/",async(req,res)=>{
    try {
        const search=req.body.search;
        const result=(await Product.find({"name":{$regex:".*"+search+".*",$options:"i"}})).concat(await Product.find({"category":{$regex:".*"+search+".*",$options:"i"}}));
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