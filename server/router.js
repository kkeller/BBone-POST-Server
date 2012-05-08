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

var DEBUG = false;

function route(handle, pathname, response, postData) {
    if (DEBUG === true) {
        console.log("About to route a request for " + pathname);
    }

  if (typeof handle[pathname] === 'function') {
      if (DEBUG === true) {
        console.log("postData in router: " + postData);
      }
     handle[pathname](response, postData);
  } else {
    if (DEBUG === true) {
        console.log("No request handler found for " + pathname);
    }
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
