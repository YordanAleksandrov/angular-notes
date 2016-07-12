var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('notes',['notes']);
var dbl = mongojs('notelist',['notelist']);
var PORT = process.env.PORT || 3500;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/notes',function(req,res){
	
	db.notes.find(function(err,docs){
		
		console.log(docs);
		res.json(docs);
		
	});
});

app.get('/notelist',function(req,res){
	
	dbl.notelist.find(function(err,docs){
		
		console.log(docs);
		res.json(docs);
		
	});
});

app.post('/notes',function(req,res){
	
	db.notes.insert(req.body,function(err,doc){
		console.log(req.body);
		res.json(doc);
		
	});
	
});

app.post('/listnotes',function(req,res){
	
	dbl.notelist.insert(req.body,function(err,doc){
		console.log(req.body);
		res.json(doc);
		
	});
	
});

app.delete('/notes/:id',function(req,res){
	
	var id = req.params.id;
	
	db.notes.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		
		res.json(doc);
		
	});
	
});

app.delete('/listnotes/:id',function(req,res){
	
	var id = req.params.id;
	
	dbl.notelist.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		
		res.json(doc);
		
	});
	
});

app.put('/notes/:id',function(req,res){
	
	var id = req.params.id;
	db.notes.findAndModify({query:{_id: mongojs.ObjectId(id)},
	update:{$set:{head: req.body.head, message: req.body.message, date: req.body.date}},
	new:true},function(err,doc){
		
		res.json(doc);
		
	});
});



app.put('/listnotes/:id',function(req,res){
	
	var id = req.params.id;
	dbl.notelist.findAndModify({query:{_id: mongojs.ObjectId(id)},
	update:{$set:{head: req.body.head, message: req.body.message, date: req.body.date}},
	new:true},function(err,doc){
		
		res.json(doc);
		
	});
});


app.listen(PORT,function(){
	
	console.log('Server running on '+ PORT);
	
});