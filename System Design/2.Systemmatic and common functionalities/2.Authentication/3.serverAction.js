/*
First of all to write server actions we have to write "use server" at the top of the file.
We can basically write this server actions in client file but they will run on the server only but it 
is not a good practice. to do this we define a function we just write inside a function on top "use server"
and one subtle detail is that we have to write async for these functions as they will be running on the 
server

so for this case serverAction will be like
export async function ServerAction(prevState,formData){}

we can basically read formData. one more thing is that we have to put name in 
the form elements and suppose we have name them email and password
we can access those values via formData.get("email") and same way we can 
access password.

As we have this as server function we cant use or we dont need to use useStates and all
these works only in the client side.
and we can directly call the api here using fetch in which we can put the end point.
and we will get the response here.

now i am assuming that here we will basically get the tokens or some role whether 
it is a admin or non admin. we can basically store these in the http only cookies.
The main benifit is that these http only cookies are send with each request to the server
and backend can read tokens and other things from there. and middleware, server components, or backend APIs 
can read these cookiesmiddleware, server components, or backend APIs can read these cookies
Here we can set expiry can also that once the token expires. we can redirect to the login page.

now suppose if we get no response or some sort of error from the api we can basically do 
one thing that we can update the prevState like{...prevState,error:data.error} and it will reflect 
in the ui that invlaid credentials and all. and for new user we can send all the information to the api and 
can receive token similarly.
*/
