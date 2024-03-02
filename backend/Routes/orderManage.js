const express=require('express')

const router=express.Router()
const {orderManageControl,allOrdersControl,ordersListControl,orderViewControl,cancelOrderControl,statusChangeControl}=require('../Controllers/orderManageControl')


router.post('/addorder',orderManageControl)
router.post('/allorders',allOrdersControl)
router.post('/orderslist',ordersListControl)
router.get('/orderview',orderViewControl)
router.post('/statuschange',statusChangeControl)
router.post('/cancelorder',cancelOrderControl)






module.exports=router