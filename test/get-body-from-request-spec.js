const EventEmitter = require('events');
const { expect } = require('chai');
const { getBodyFromRequest } = require('../get-body-from-request');
describe("The getBodyFromRequest function", () => {
  let fakeReq = null;

  beforeEach(() => {
    fakeReq = new EventEmitter();
  });

  it('returns an empty string for no body', done => {
    let bodyRequest = getBodyFromRequest(fakeReq)

    fakeReq.emit('end')

    bodyRequest
      .then(body => {
        if(body === ""){
          done()
        }else{
          done(`Failed. Got ${body}`)
        }
      });
    });


    it('returns the data read from the stream', done => {
      let bodyRequest = getBodyFromRequest(fakeReq);
      let data1 = "This is some";
      let data2 = "Data from the browser";

      fakeReq.emit('data', data1);
      fakeReq.emit('data', data2);

      fakeReq.emit('end');

      bodyRequest
      .then(body => {
        if(body === (data1 + data2)){
          done()
        }else{
          console.log(body);
          done("Failed" + body);
        }
      })

    });

  });
