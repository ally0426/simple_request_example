# Request Module Example

According to [the docs](https://github.com/request/request), "Request is designed to be the simplest way possible to make http calls." Just by using a simple require statement we are given access to all of the verbs needed to interact with other servers. 

##Why server-side requests?

Same-Origin Policy. The same-origin policy is a policy browsers implement that permits scripts contained on one site to access data on another web page, but only if both web pages have the same origin. This prevents a malicious script on one page from obtaining access to sensitive data on another.

Basically, from the browser you are only allowed to make HTTP calls to the things that you own. You cannot call on other servers unless they allow you to. Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the resource originated. This, along with lesser-used JSONP, give us a way around the same-origin policy on the client side. 

However, we have no such restrictions when dealing with server-side code! Therefore, we have a lot more flexibility and can access far more APIs.

##How?

It's simple. First, run `npm install --save request`. Then require the module:

```
const request = require("request")
```
Now, you can begin making requests using the request constant. 

Lets begin with the simplest request: 

```
request('http://workbook.galvanize.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
```

As you can see, in its simplest form request is a function that takes two parameters, a url and a callback function that is run after the response comes back. The callback's three parameters are `error`, `response`, and `body`. 

If something goes wrong with our request the server we are requesting from will likely send back an error and this will be found in the `error` parameter. If there are no errors sent back the value will be `null`. 

The next argument is the `response` object. This object contains useful info about the call including the status code and headers. This can be useful for checking errors as we did above by looking at the status code.

Finally, we come to the `body`. This is often the meat of what we are looking for. It will contain the data you were requesting from the server. Remember, the type of the data coming back is still a string because it is fresh off the wire so you will need to `JSON.parse` it. 

While this way of making requests is useful for understanding the basics of the module, it is very limiting because it only allows for GET requests. Further, we can't add any custom headers or anything else that may need to be added to the request. So, when we need a little more, it is useful to pass in an object as the first parameter with keys and values that allow us to be more specific about the request.

```
request({
  url: "http://workbook.galvanize.com",
  method: "DELETE",
  timeout: 10000,
  headers: {
  	content-type: "application/json"
  },
  form: {
  	foo: "bar";
  }
}, function(error, response, body) {
  console.log(body);
});
```
Alternatively, you may see this equally valid and arguably more readable:
```
var options = {
  				uri: "http://workbook.galvanize.com",
 			 	method: "POST",
  				timeout: 10000,
  				headers: {
  					content-type: "application/json"
  				},
  				form: {
  					foo: "bar";
  				}
			}
request( options , function(error, response, body) {
  console.log(body);
});
```

The final syntax for making basic requests with Request is very similar to how we make AJAX requests with jQuery: 

```
request.post({url:'workbook.galvanzie.com', form: {key:'value'}}, function(err,response,body){ console.log(body) });
```

As you can see, we can chain a method of post to the request const and then call it with two parameters. The parameters are the same as above (an object full of configs and a callback). As with all things, there are more ways of using this same method. This way was chosen because it is similar to the generic request above, but check the docs for alternative ways to use `.post` and the like.

________________

### Exercise

This simple app should submit a form to your server which will then make a request to the given API endpoint. This API will then save your info and display it at [this site.](https://g22-students.herokuapp.com/students)

To get started, `git clone` this repo and run `npm install`. You should then be able to get started writing your server-side request code. Here are the [docs](https://github.com/request/request) for a reference.

____________________



