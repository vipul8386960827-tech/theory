/* 
So this form is basically client side rendered but i will make the api calls on the server
so that whatever response and other things are there remain hidden in the network tab.
I basically try to call the apis on the server as much as possible so that it is fast and secure.

so in this particular scenario I will be using form component and will be using useActionState
a basically a new react hook which helps us to call server functions. and it also reduces 
the code size also and reduces the number of renders. as we dont have to write useState
and all and hence the re renders will be reduced and overall code is reduced too. 
the structure of useActionState is like

const [state,formAction]=useActionState(serverAction,initialValue)
and this initalValue in this particular case we can use to show error

const initialState ={error:null}
suppose we hit the api with the credentials and both or either email or password is incorrect
server will give us some sort of error we can basically use it to show error here.

we can show error like {state.error &&<p>{state.error}</p>}

and one more thing i forgot to mention as in nextjs all the components are basically 
server components by default we have to specify "use client" at the top as we are using useActionState
which is client side only



*/