### **Step 1: Modify Cell States**
- In the practice section, **double click/single click** on cells to modify them.
  - **Terminal States:** Mark goal states (e.g., charging stations) by single-clicking to turn them green.
  - **Blocked States:** Mark obstacles or inaccessible areas by double-clicking to turn them black.

### **Step 2: Adjust Parameters and Grid Size**
- Modify algorithm parameters and grid size through the **Control Menu**.

### **Step 3: Q Value Representation**
- The grid represents the **Q values** for each action: Left, Up, Right, and Down.

### **Step 4: Advancing Steps in Iteration**
- Click **"Next Value"** to proceed to the next step in the current iteration.
  - The **step count** will increase with each click.
  - Upon reaching a terminal state or the maximum steps allowed per iteration, the iteration count will increase, and the step count resets to 0.

### **Step 5: Progressing to the Next Iteration**
- Click **"Next Iteration"** to move on to the subsequent iteration.

### **Step 6: Policy Visualization**
- The **arrows in the left grid** show the currently learned policy based on the Q values.

### **Step 7: Achieving Optimal Policy**
- A notification will be displayed when the Q values for all actions converge, indicating the selection of an **Optimal Policy**.
