1) How easy is it to control the canvas ?

- The canvas is very smooth to control. 
-Fitview makes it such that on refresh the nodes are auto-centered. 
-Using pan, we can drag around the whole network wherever we want. 
-minZoom & maxZoom features allow to zoom-in and zoom-out upto a certain number.
- ZoomOnPinch and ZoomOnScroll allows us to zoom the nodes while scrolling mouse or when pinching across the screen. background colors can be set according to the user.

---

2) If we want create own custom nodes, how can we do that?

- A custom node is a component. Node UI is customizable. Each custom node can have data like label, status, etc.
- Nodes are registered using 'nodeType', and referenced using 'type'. 
-It supports handles, events, buttons, etc.


---

3) Can we control the node creation by calling a function, let's say (createNode(link)) ?

-Yes nodes can be created by writing code inside a function to create a new node, and calling that function(createNode).
- React Flow supports programmatic node creation, enabling AI-driven graph generation.

---

4) How can we connect a node with other nodes?

- We can create a function to add an edge from sourceId to targetId of source and target nodes. Then we'll call that function using a button. Then an edge will connect those two nodes.

---

5) Do we have event listeners on nodes ?

-Yes many event listeners on nodes exist such as click, selection, drag, etc.
-Node event listeners make the nodes interactive and helps to tell what the user did with any node(example, if user clicked node, dragged it, when did they drag it, etc).

Examples: 
-onNodeClick gives full node context.
-OnNodeDragStart is triggered with user drags/moves a node.
-onNodeMouseEnter is triggered when user hovers over a node.
