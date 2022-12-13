const express = require('express');
const app=express();
const path=require('path')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
app.set('view engine','ejs');
app.set('views','views')
app.use(express.static(path.join(__dirname,'statics')));

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
});

http.listen(port, (err) => {
  if(!err){
    console.log(`Socket.IO server running at http://localhost:${port}/`);}
    else console.error(err);
  
});