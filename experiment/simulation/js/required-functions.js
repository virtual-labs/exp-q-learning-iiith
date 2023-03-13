export const DIRECTIONS = { UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4 };
const minDifference = 0.001;

DIRECTIONS.toString = function (x) {
  switch (x) {
    case DIRECTIONS.UP:
      return "up";
    case DIRECTIONS.DOWN:
      return "down";
    case DIRECTIONS.LEFT:
      return "left";
    case DIRECTIONS.RIGHT:
      return "right";
    default:
      return "unknown";
  }
}

export const getDirection = (i, j, grid, R = 0, valueForTerminal = undefined) => {
  let next_action_direction = grid[i][j].indexOf(Math.max(...grid[i][j]))
  if (next_action_direction == 0) {
    return 'left';
  }
  else if (next_action_direction == 1) {
    return 'up';
  }
  else if (next_action_direction == 2) {
    return 'right';
  }
  else if (next_action_direction == 3) {
    return 'down';
  }
  return 'unknown';
}

export function makeGrid(x, y = -1) {
  if (y == -1) {
    y = x;
  }
  const grid = [];
  for (var i = 0; i < x; i++) {
    grid[i] = [];
    for (let j = 0; j < y; j++) {
      grid[i][j] = [];
      for (let k = 0; k < 4; k++) {
        grid[i][j][k] = 0;
      }
    }
  }
  grid.finalStates = [];
  grid.completed = false;
  grid.size = [x, y, 4];
  console.log(grid)
  return grid;
}


export function addFinalStates(x, y, value, grid) {
  const newGrid = structuredClone(grid);
  newGrid.finalStates.push({ x: x, y: y, value: value });
  newGrid[x][y][0] = value;
  newGrid[x][y][1] = value;
  newGrid[x][y][2] = value;
  newGrid[x][y][3] = value;
  return newGrid;
}
export function addObstacles(x, y, value = -2, grid) {
  const newGrid = structuredClone(grid);
  newGrid[x][y][0] = value;
  newGrid[x][y][1] = value;
  newGrid[x][y][2] = value;
  newGrid[x][y][3] = value;
  return newGrid;
}

export const isObstacle = (x, y, grid) => {
  return grid[x][y][0] === -2 && grid[x][y][1] === -2 && grid[x][y][2] === -2 && grid[x][y][3] === -2;
};

export const isTerminalState = (i, j, grid) => {
  return grid.finalStates.some(state => state.x == i && state.y == j);
};

export const getFinalStates = (grid) => {
  return grid.finalStates;
};
function isValidNeighbour(i, j, grid) {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && !isObstacle(i, j, grid);
}
export function getNeighbours(i, j, grid) {
  const neighbours = [];
  if (isValidNeighbour(i - 1, j, grid)) {
    neighbours.push({ x: i - 1, y: j });
  }
  if (isValidNeighbour(i, j + 1, grid)) {
    neighbours.push({ x: i, y: j + 1 });
  }
  if (isValidNeighbour(i, j - 1, grid)) {
    neighbours.push({ x: i, y: j - 1 });
  }
  if (isValidNeighbour(i + 1, j, grid)) {
    neighbours.push({ x: i + 1, y: j });
  }
  return neighbours;
}
function getNeighborValues(
  i,
  j,
  next_action,
  R,
  grid,
  defaultCellValue = 0,
  valueForTerminal = undefined
) {
  let new_i = i, new_j = j;
  if (next_action == 0) {
    new_j = j - 1;
  }
  else if (next_action == 2) {
    new_j = j + 1;
  }
  else if (next_action == 1) {
    new_i = i - 1;
  }
  else if (next_action == 3) {
    new_i = i + 1;
  }

  const isValid = isValidNeighbour(new_i, new_j, grid)
  if (!isValid) {
    new_i = i, new_j = j;
  }
  console.log(grid[new_i][new_j])
  const max_next_q_sa = Math.max(...grid[new_i][new_j])
  return max_next_q_sa;
}


export function nextCell(i, j, next_action, grid) {
  let new_i = i, new_j = j;
  if (next_action == 0) {
    new_j = j - 1;
  }
  else if (next_action == 2) {
    new_j = j + 1;
  }
  else if (next_action == 1) {
    new_i = i - 1;
  }
  else if (next_action == 3) {
    new_i = i + 1;
  }

  const isValid = isValidNeighbour(new_i, new_j, grid)
  if (!isValid) {
    new_i = i, new_j = j;
  }

  return [new_i, new_j];
}


export const calculateNewValue = (x, y, next_action, reward = 0, gamma = 0.9, grid, returnValue = 1) => {
  if (returnValue === 0) {
    return getNeighborValues(x, y, next_action, reward, grid, 0, 0);
  }
  const {
    up,
    down,
    left,
    right,
    rewardDown,
    rewardLeft,
    rewardRight,
    rewardUP,
  } = getNeighborValues(x, y, reward, grid, 0, 0);
  // console.log(up + " " + down + " " + left + " " + right + " " + rewardUP + " " + rewardLeft + " " + rewardRight + " " + rewardDown);
  const result = [];

  result.push(
    0.8 * (rewardUP + gamma * up) +
    0.1 * (rewardRight + gamma * right) +
    0.1 * (rewardLeft + gamma * left)
  );

  result.push(
    0.8 * (rewardDown + gamma * down) +
    0.1 * (rewardRight + gamma * right) +
    0.1 * (rewardLeft + gamma * left)
  );

  result.push(
    0.8 * (rewardRight + gamma * right) +
    0.1 * (rewardUP + gamma * up) +
    0.1 * (rewardDown + gamma * down)
  );

  result.push(
    0.8 * (rewardLeft + gamma * left) +
    0.1 * (rewardUP + gamma * up) +
    0.1 * (rewardDown + gamma * down)
  );
  // console.log(result);
  // max of the values
  const max = Math.max(...result);

  return max;
};

export const completedOrNot = (grid, newGrid) => {
  var diff = 0;
  const size = newGrid.size;
  for (let j = 0; j < size[0]; j++) {
    for (let k = 0; k < size[1]; k++) {
      for (let tt = 0; tt < size[2]; tt++) {
        diff = Math.max(diff, Math.abs(grid[j][k][tt] - newGrid[j][k][tt]));
      }
    }
  }
  if (diff < minDifference) {
    console.log("Minimum difference reached");
    newGrid.completed = true;
    return true;
  }
  return false;
}

export const valueIteration = (grid, reward = 0, discountFactor = 0.9) => {

  var newGrid = structuredClone(grid);
  const size = newGrid.size;
  const maxIterations = 1;
  const minDifference = 0.001;


  for (let i = 0; i < maxIterations; i++) {
    const tempGrid = structuredClone(newGrid);
    let difference = 0;
    for (let j = 0; j < size[0]; j++) {
      for (let k = 0; k < size[1]; k++) {
        if (newGrid[j][k] != 1 && newGrid[j][k] != -1 && !isObstacle(j, k, newGrid)) {
          const newValue = calculateNewValue(
            j,
            k,
            reward,
            discountFactor,
            newGrid
          );
          // console.log(newValue);
          tempGrid[j][k] = newValue;
          difference = Math.max(difference, Math.abs(newValue - newGrid[j][k]));

        }
      }
    }
    newGrid = structuredClone(tempGrid);
    if (difference < minDifference) {
      console.log("Minimum difference reached");
      newGrid.completed = true;
      break;
    }

    // if (i == maxIterations - 1) {
    //   console.log("Max iterations reached");
    // }
  }
  return newGrid;
};
