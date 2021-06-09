const express=require('express');

const router=express.Router();
const userController=require('../controllers/userController');
 
router.get('/register', userController.user_register_get);

router.post('/register',userController.user_register_post);
 
router.get('/', userController.user_login_get);

router.post('/',userController.user_login_post);

router.get('/:id',userController.blog_details);
//router.get('/homepage',userController.user_render_home);

//router.get('/movies',userController.user_render_movies);

 module.exports=router;