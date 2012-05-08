//
// Copyright (C) 2012 - Cabin Programs, Ken Keller 
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// This project produces a POST server on node.js/cloud9 on the BeagleBone.
// This server is able to access the following bonescript functions:
//  - pinMode()
//  - digitalWrite()
//  - digitalRead()
//  - analogRead()
//  - shiftOut()
//
// Files descriptions:
//  - index.js           :  main file - run this file to start the POST server
//  - server.js          :  creates the actual server
//  - router.js          :  routes request to handler or 404 page
//  - requestHandler.js  :  file with all of the handlers
//
// Design ideas and valuable knowledge for this POST server was inspired
//   from http://www.nodebeginner.org
//

var querystring = require("querystring");
var bb = require('../bonescript');
var pin;
var value;

var DEBUG = false;

function bbdefault(response, postData) {
    if (DEBUG === true) {
        console.log("Request handler 'bbDefault' was called.");
    }
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("BeagleBone POST Server default page");
  response.end();
}

function init(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("init: postData: '" + postData + "'");
  response.write("\ninit: postData:pin " + querystring.parse(postData)["pin"]);
  response.write("\ninit: postData:value " + querystring.parse(postData)["value"]);
  pin = querystring.parse(postData)["pin"];
  value = querystring.parse(postData)["value"];
  var script = 'pinMode(bone.'+ pin +', ' + value + ' );';
  try
  {
      eval(script);
  }
  catch (err)
  {
      response.write("\ninit: error: Bad initialization of input/output pin.\n" + err);
  }  
  response.end();
}

function output(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("output: postData: '" + postData + "'");
  response.write("\noutput: postData:pin " + querystring.parse(postData)["pin"]);
  response.write("\noutput: postData:value " + querystring.parse(postData)["value"]);
  pin = querystring.parse(postData)["pin"];
  value = querystring.parse(postData)["value"];

  var script = 'digitalWrite(bone.'+ pin +', ' + value + ' );';
  try
  {
      eval(script);
  }
  catch (err)
  {
      response.write("\noutput: error: Bad write of digital data.\n" + err);
  }

  response.end();
}

function input(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("input: postData: '" + postData + "'");
  response.write("\ninput: postData:pin " + querystring.parse(postData)["pin"]);
  pin = querystring.parse(postData)["pin"];
  
  var data;
  var script = 'digitalRead(bone.'+ pin + ');';
  try 
  {
      data = eval(script);
  }
  catch (err)
  {
      data = 0;
      response.write("\ninput: error: Bad read of digital data.\n" + err);
  }
  response.write("\ninput: return:" + data);
  response.end();
}

function analog(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("analog: postData: '" + postData + "'");
  response.write("\nanalog: postData:pin " + querystring.parse(postData)["pin"]);
  pin = querystring.parse(postData)["pin"];
  
  var data;
  try
  {
      data = analogRead((pin)*1);
  }
  catch (err)
  {
      data = 0;
      response.write("\nanalog: error: Bad read of analog data.\n" + err);
  }
  
  // This fixes an issue of c-null terminated string VS node.js buffer class...
  if (data[1]===0)
    response.write("\nanalog: return:" + data.toString('utf8',0,1) );
    else if (data[2]===0)
        response.write("\nanalog: return:" + data.toString('utf8',0,2) );
        else if (data[3]===0)
            response.write("\nanalog: return:" + data.toString('utf8',0,3) );
            else response.write("\nanalog: return:" + data );
        
  response.end();
}

function shift(response, postData) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("shiftOut: postData: '" + postData + "'");
  response.write("\nshiftOut: postData:dataPin " + querystring.parse(postData)["data"]);
  var dataPin = querystring.parse(postData)["data"];
  response.write("\nshiftOut: postData:clockPin " + querystring.parse(postData)["clock"]);
  var clockPin = querystring.parse(postData)["clock"];
  response.write("\nshiftOut: postData:bitOrder " + querystring.parse(postData)["order"]);
  var bitOrder = querystring.parse(postData)["order"];
  response.write("\nshiftOut: postData:value " + querystring.parse(postData)["value"]);
  var value = querystring.parse(postData)["value"];
  
  var script = 'shiftOut(bone.'+dataPin+', '+'bone.'+clockPin+', '+bitOrder+', '+value +');';
  try
  {
      eval(script);
  }
  catch (err)
  {
      response.write("\nshiftOut: error: Bad shiftOut call.\n" + err);
  }

  response.end();
}

exports.bbdefault = bbdefault;
exports.init = init;
exports.output = output;
exports.input = input;
exports.analog = analog;
exports.shift = shift;
