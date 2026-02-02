/* 28_purpose_of_getsnapshotbeforeupdate.js

=====================================
Purpose of getSnapshotBeforeUpdate in React
=====================================

Definition:
`getSnapshotBeforeUpdate` is a **lifecycle method** called right **before the DOM updates**.
It captures information from the DOM (a "snapshot") before changes are applied, which can then 
be used in `componentDidUpdate` to perform post-update adjustments.

-------------------------------------
Key Points:
-------------------------------------
1. Parameters:
   - Receives `prevProps` and `prevState`.

2. Return Value:
   - Must return a value (snapshot) passed as the third argument to `componentDidUpdate`.
   - Can return `null` if no snapshot is needed.

3. Common Use Cases:
   - Preserve scroll position before DOM updates.
   - Measure DOM nodes (height, width) before update.
   - Smooth animations based on pre-update DOM state.

4. Must be paired with:
   - `componentDidUpdate` to act on the snapshot.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture scroll position before new messages
    if (prevProps.messages.length < this.props.messages.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      // Restore scroll position after update
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef} style={{ height: "200px", overflow: "auto" }}>
        {this.props.messages.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
    );
  }
}

export default ChatList;

-------------------------------------
Analogy:
-------------------------------------
- DOM before update = bookshelf before adding new books.
- Snapshot = note of current arrangement.
- After update = add books while maintaining previous arrangement.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can getSnapshotBeforeUpdate run without componentDidUpdate?  
A1: Yes, but the snapshot would not be used; it’s only meaningful when acted upon in componentDidUpdate.

Q2: Does it run on initial render?  
A2: No, only before updates.

Q3: What happens if undefined is returned?  
A3: Treated as null; nothing is passed to componentDidUpdate.

Q4: Why not capture scroll position in componentDidUpdate directly?  
A4: Because the DOM has already changed; pre-update values are needed.
*/
