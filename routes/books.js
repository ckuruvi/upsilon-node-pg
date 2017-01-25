var router=require('express').Router();

var pg=require('pg');

var config={
  database:'library'
};

var pool=new pg.Pool(config);  //default connection pool set to 10
router.get('/',function(req,res){
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {
      client.query('SELECT * FROM books;',function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('got info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});

router.post('/',function(req,res){
  console.log('req.body::',req.body);
  pool.connect(function(err,client,done){
    if(err){
      console.log('error connecting to DB',err);
      res.sendStatus(500);
      done();
    } else {

      client.query(
      'insert into books (title,author,publication_date,edition,publisher) values($1,$2,$3,$4,$5) returning *;',
      [req.body.title,req.body.author,req.body.published,req.body.edition,req.body.publisher],
      function(err,result){
        done();
        if(err){
          console.log('error querying db',err);
          res.sendStatus(500);
        } else {
          console.log('got info from db',result.rows);
          res.send(result.rows);
        }
      });
    }
  });
});
module.exports=router;
