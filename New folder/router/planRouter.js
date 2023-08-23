const express=require("express");
const planRouter=express.Router();
const{protectRoute,isAuthorised}=require('../controller/authController');
const planModel = require("../.vscode/models/planModel");

const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan,top3Plans}=require('../controller/planController');

//all palns leke aayega 
planRouter.route('/allPlans')
.get(getAllPlans)

//own plan ->logged in necessary
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan)


planRouter.route('/top3')
.get(top3Plans)
//admin nd reataurant owner can only 
//create,update,delete oprns[]
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)



 
module.exports=planRouter;