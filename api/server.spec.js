const request = require('supertest');

const Server = require('./server.js');

describe('GET /', () => {
  it('should return 200', () => {
      
      return request(Server)
          .get('/')
          .expect(200)
          
  })

  it('{api:"up"', () => {
      const message = {api: 'up'};
          return request(Server)
              .get('/')
              .then(res => {
                  expect(res.body).toEqual(message);
              })
  })
})


describe('Post', () => {
    it('should return 201', () => {
        const newAvenger =   {
            name: 'ironman'// not required
          };

        return request(Server)
          .post('/avengers')
          .send(newAvenger)
          .expect(201)
          .catch(res=>{
                expect(422)
          })
    })

    it('should return 422 when incomplete request', () => {
        const newAvenger =   {
            name: '', 
          };

        return request(Server)
          .post('/avengers')
          .send(newAvenger)
          .then(res => {
              expect(res.body).toEqual({message: 'error adding avenger'})
          })
          .catch(res=>{
                expect(500)
          })
    })

    it('should return 500 when wrong request', () => {
        const newAvenger =   {
            title: 'thor' 
          };

        return request(Server)
          .post('/avengers')
          .send(newAvenger)
          .then(res => {
              expect(res.body).toEqual({message: 'incomplete avenger request'})
          })
    })
})

describe('delete', () => {

    it('should return 200', () => {


        return request(Server)
          .delete('/avengers')
          .send({name: 'ironman'})
          .expect(200)
          .then(res => {
              console.log(res.body);
              expect(res.body).toEqual({message: 'avenger deleted'});
          })
    })


    it('should return 404', () => {


        return request(Server)
          .delete('/avengers')
          .send({name: 'black widow'})
          .expect(404)
          .then(res => {
              console.log(res.body);
              expect(res.body).toEqual({message: 'avenger does not exist'});
          })
    })
})