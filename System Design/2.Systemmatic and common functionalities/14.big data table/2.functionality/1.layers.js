/*
Great, since we have the requirements, I’ll jump into the High-Level Architecture. I like to think of this in three parts:
How we get the data (The API and Network logic).
How we store the data (State management and Caching).
How we show the data (The Table UI and Virtualization).
I’ll start with the API design, because with a million rows, how we fetch that data is our first big bottleneck 
*/
