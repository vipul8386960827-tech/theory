/*
-------track page changes---------
Suppose i am using next.js. I will import usePathName from next/navigation. and wil create a 
new variable pathName = usePathName() and i will import useRef and useEffect from react
and i will create another variable previousPath and will create a new ref for this.
I wil be using ref for this because if i will use useState it will cause an unnecessary 
re-render.

We can create a useEffect and put the pathname in the dependecy array. when ever pathName
changes we can create a new object with the event recorded we can basically 
add few things in that like timeStamp and we can put type also in that object like page_view.
and here also we can set prevPathRef and store current path in it.

Now there will be one issue that is if we go to different pages and than refresh at that time 
the ref will become null and the in the object which we have created there will be null
what we can do is we can store this prevPath in local or session storage.

We have to put it in local or session storage because useRef only preserves value during
the SPA lifecycle. SPA lifecycle means the lifetime of the Single Page Application from
initial load until a full page refresh or tab close. When we refresh the page, the entire
JavaScript context is recreated and all in-memory values like useRef and useState are reset.

By storing prevPath in sessionStorage or localStorage, we can persist the value outside
the in-memory SPA lifecycle, so even after a refresh we can retrieve the previous path
and avoid getting null in our page_view object.


--------button click identification---------------
for identifying the button clicks, instead of adding it to everybutton manually we can detect
them inside these wrapper file. But to identify the button like from where the button is clicked
what action does it perform, which component it belongs to we will use data-* or custom attributes
like on each button we have to define these attributes like 
<button data-component="componentA" data-action="submit form">Submit</button>

now we can add a new useEffect with pathName in the dependecy array. here we will attach
a addEventListner over the document like you can say document.addEventLister('click',handleClick,true).
we have to make it true because we want to capture that event during the capturing phase because
there might be the case developer might use e.stopPropagation() which will prevent the event
from reaching  bubbling phase.
now in the useEffect we have to basically check the target we can identify like
const handleClick=(e)=>{
    const target = e.target.closest("[data-action]")
    if(!target) return;
    const event ={
    type="click",
    currentPage:pathName,
    action:target.dataset.action||null,
    component:target.dataset.component ||null,
    timeStamp:Date.now()
    }
}
*/
