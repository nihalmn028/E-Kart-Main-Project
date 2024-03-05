const express=require('express')

const router=express.Router()
const {orderManageControl,deleteorderControl,allOrdersControl,overviewControl,ordersListControl,orderViewControl,cancelOrderControl,statusChangeControl}=require('../Controllers/orderManageControl')


router.post('/addorder',orderManageControl)
router.post('/allorders',allOrdersControl)
router.post('/orderslist',ordersListControl)
router.get('/orderview',orderViewControl)
router.post('/statuschange',statusChangeControl)
router.post('/cancelorder',cancelOrderControl)
router.get('/overview',overviewControl)
router.delete('/deleteorder/:id',deleteorderControl)








module.exports=router