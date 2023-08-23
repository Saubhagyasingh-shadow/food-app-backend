const reviewModel = require("../.vscode/models/reviewModel");
const planModel=require("../.vscode/models/planModel");
const{updatePlan}=require('../controller/planController')

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        const reviews=await reviewModel.find()
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({message:'review not found'})
        }
    }
    catch(err){
        return res.json({message:'error found'})
   
    }
}

module.exports.top3Reviews=async function top3Reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({rating:-1}).limit(3);
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({message:'review not found'})
        }
    }
    catch(err){
        return res.json({message:'errors found'})
   
    }
}

module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        //plan click->corresponding jitne bhi reviews hain vo leke aane hain
        let planid=req.params.id;
        let reviews=await reviewModel.find();
        //saare le aaye fir filter kar die
         reviews= reviews.filter(review=>review.plan._id==planid);
    
    return res.json({
        message:'reviews retrieved for a particular plan successfully',
        data:reviews
    });
}
    catch(err){
        return res.json({message:'error found'})
   
    }
}

module.exports.createReview=async function createReview(req,res){
    try{
    let id=req.params.plan;
let plan=await planModel.findById(id);
let review=await reviewModel.create(req.body);
//humein ise baad mein review k hissab se shi karna hai taaki mujhe pta chale ki kitne number of revieews mile hain toh schema mein ek n um ber of reviews wk pllan k lie wkhna hoga
plan.ratingsAverage=(plan.ratingsAverage+req.body.rating)/2;
await plan.save();
res.json({
    message:'review created',
    data:review,
});
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}

module.exports.updateReview=async function updateReview(req,res){
    try{
        //plan id
        let planid=req.params.id;
        //review id 
        let id=req.body.id;
        let dataToBeUpdated=req.body;
        // console.log(id);
        // console.log(dataToBeUpdated);
        let keys=[];
        for(let key in dataToBeUpdated){
            if(key=='id') continue;
            keys.push(key);
        }
        
        let review=await reviewModel.findById(id);
        for(let i=0;i<keys.length;i++){
            review[keys[i]]=dataToBeUpdated[keys[i]];
        }
        // console.log(plan);
        //documen t aur document ko .save hota hai
        await review.save();
      return res.json({
            message:'plan updated successfully',
            data:review
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports.deleteReview=async function deleteReview(req,res){
    try{
    let planid=req.params.id;
    let id=req.body.id;
// let plan=planModel.findByIdAndDelete(id);
let review=await reviewModel.findById(id);
res.json({
    message:'review deleted',
    data:review,
});
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
}