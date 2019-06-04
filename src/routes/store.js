import express from 'express';
import passport from 'passport';
import passportAuth from '../config/passport';
import store from '../controllers/store';

const router = express.Router();
router.post('/api/v1/store/:coopName', store.addStore);
router.get('/test', passport.authenticate('jwt', { session: false }),(req, res) => {
    return res.status(200).send({
        message: 'hello world'
    })
})
	
export default router;