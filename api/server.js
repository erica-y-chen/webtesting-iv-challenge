const express = require('express');

const avengers = ['ironman', 'captain america']

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});


server.get('/avengers', async(req, res) => {
    res.status(200).json({ message: 'recieved data' })
})



server.post('/avengers', async(req, res) => {
  const avenger = req.body;
      if(avengers.name) {
          try {
              const newAvenger = await avenger.add(avenger);
              res.status(201).json(newAvenger);
          } catch (error) {
              res.status(500).json({message: 'error adding avenger'})
          }
          } else {
              res.status(422).json({ message: 'incomplete avenger request'})
          }
      })


server.delete('/avengers', async(req, res) => {
    const avenger = req.body.name;
    const location = avengers.indexOf(avenger)
     if(location == -1) {
         res.status(404).json({message: 'avenger does not exist'})
     }
     else{
         avengers.splice(location)
         res.status(200).json({message: 'avenger deleted'})
     }
    })
module.exports = server;
