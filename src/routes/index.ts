import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello Serverless World!!!');
});

export default router;
