/*
  Cursor or mouse jumping can happen in collaborative editors because
  remote operations modify the DOM structure. When the DOM changes,
  the browser may recalculate the selection and the cursor position
  can move unexpectedly.

  To prevent this, collaborative editors follow a few theoretical steps:

  1. Save the Local Cursor Position
     Before applying a remote operation, the editor stores the current
     cursor or selection position (start and end offsets).

  2. Apply the Remote Operation
     The formatting or text change coming from another user is applied
     to the document.

  3. Transform the Cursor Position
     If the remote operation inserted or removed characters before the
     local cursor, the cursor position is adjusted accordingly so that
     it still points to the same logical position in the document.

     Example:
     If the cursor was at position 10 and another user inserted
     5 characters before that position, the cursor should move to 15.

  4. Restore the Cursor Selection
     After the operation is applied and the cursor position is updated,
     the editor restores the selection so the user’s cursor remains
     stable and does not visually jump.

  5. Maintain a Document Model
     Advanced editors keep an internal representation of the document
     instead of relying directly on the DOM. Operations modify this
     model first, and then the DOM is updated from it. Cursor positions
     are tracked relative to this model.

  6. Use Collaboration Algorithms
     Real collaborative editors often use algorithms like Operational
     Transform (OT) or CRDT to correctly transform operations and
     cursor positions when multiple users edit the document at the
     same time.

  These techniques help ensure that when remote changes arrive,
  the local user's cursor remains stable and the editing experience
  feels smooth.
*/
