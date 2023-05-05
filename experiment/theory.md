## Introduction

Q-learning is a popular reinforcement learning algorithm that enables an agent to learn an optimal policy for taking actions in an environment by estimating the expected long-term reward of each action in a given state. It is a model-free approach, meaning it does not require knowledge of the underlying dynamics of the environment. Q-learning uses a trial-and-error approach to iteratively update the Q-values for each state-action pair, based on the reward feedback received from the environment. Through repeated interactions with the environment, the agent gradually learns an optimal policy that maximizes its long-term reward. 

## Parameters

Q-learning has several parameters that can be tuned to improve its performance in different environments. Here are some of the key parameters used in Q-learning:

- **Learning rate (alpha)**: The learning rate controls how much the Q-values are updated at each iteration. A high learning rate means that the agent learns quickly from new experiences, but may also overwrite useful information from previous experiences. A low learning rate means that the agent learns slowly but is more likely to converge to the optimal policy.

- **Discount factor (gamma)**: The discount factor controls the importance of future rewards in the agent's decision-making. A high discount factor means that the agent cares more about long-term rewards, while a low discount factor means that the agent focuses more on short-term rewards. Choosing the right discount factor depends on the environment and the task, as it affects the tradeoff between exploration and exploitation.

- **Exploration rate (epsilon)**: The exploration rate controls the balance between exploration and exploitation of the state-action space. A high exploration rate means that the agent chooses actions randomly with high probability, which can help the agent discover new states and avoid getting stuck in suboptimal policies. A low exploration rate means that the agent mostly chooses actions based on the current Q-values, which can help the agent converge faster to the optimal policy.

- **Initial Q-values**: The initial Q-values can affect the agent's learning speed and the convergence of the Q-values. Setting the initial Q-values too high or too low can affect the exploration and exploitation balance and the agent's ability to find the optimal policy. We have defined them as 0.

- **Reward function**: The reward function defines the immediate rewards received by the agent for taking different actions in different states. Designing an appropriate reward function is critical for Q-learning, as it affects the agent's behavior and the convergence of the Q-values.

- **Termination condition**: The termination condition determines when the agent should stop learning and testing the policy. This can be a fixed number of iterations, a threshold on the change in Q-values, or a certain level of performance on the task.
    - In our case the we iterate until change in Q-values is more than a threshold value
    - For an iteration we terminate when it reaches terminal state marked green/red or if the number of steps cross grid-size^2.

Tuning these parameters can be challenging, as it requires balancing the tradeoff between exploration and exploitation and finding the right balance between learning speed and convergence. 

## Algorithm

The steps involved are:

**1. Initialize the Q-values**: Start by initializing the Q-values for each state-action pair. We can define them randomly or as 0.

**2. Choose an action**: Given the current state, choose an action based on the current policy. This is done using an exploration-exploitation strategy, such as epsilon-greedy, where the agent selects the best action with probability 1-epsilon, and a random action with probability epsilon.

**3. Observe the reward and new state**: After taking the chosen action, observe the reward received from the environment and the resulting new state.

**4. Update the Q-value**: Use the Bellman equation to update the Q-value for the previous state-action pair based on the observed reward and the estimated value of the next state-action pair. This can be done using the following formula:

```
Q(s,a) = Q(s,a) + alpha * [r + gamma * max(Q(s',a')) - Q(s,a)]

Where:

max(Q(s',a')) is the maximum Q-value for the next state s' and all possible actions a'
```

**On-policy methods update the Q-values based on the actions taken by the current policy, while off-policy methods use a different policy to update the Q-values. Thus Q-Learning is an off policy method as it updates the Q values based on max value instead of current policy**

**5. Repeat steps 2-4**: Continue selecting actions, observing rewards, and updating Q-values until the agent reaches a terminal state or a maximum number of iterations.

**6. Update the policy**: After the Q-values have converged, update the policy to select the action with the highest Q-value for each state.

**7. Repeat steps 2-6**: Continue training the agent by repeatedly updating the Q-values and the policy until the optimal policy is found.

## Advantages

Q-learning has several advantages, including:

- **Model-free**: Q-learning does not require knowledge of the underlying dynamics of the environment, making it suitable for complex and unknown environments.

- **Convergence**: Q-learning guarantees convergence to an optimal policy, given sufficient exploration and a finite number of states and actions.

- Off-policy learning: Q-learning can learn from experience generated by any policy, including a random or exploratory policy, which allows for more efficient exploration of the state-action space.

- Handling of delayed rewards: Q-learning is capable of handling delayed rewards and long-term goals, which is critical in many real-world applications.

- Easy implementation: Q-learning is relatively easy to implement and can be applied to a wide range of problems, making it a popular and widely used reinforcement learning algorithm.

**Overall, Q-learning is a powerful and versatile algorithm that can learn optimal policies in complex environments without requiring knowledge of the underlying dynamics of the environment. Q-learning can be applied in various domains, such as robotics, game playing, and finance.**

## Disadvantages

Q-learning also has some disadvantages, including:

- Slow convergence: Q-learning may require a large number of iterations to converge to an optimal policy, especially in large state and action spaces, which can result in high computational costs.

- Exploration-exploitation tradeoff: Q-learning requires a balance between exploration and exploitation of the state-action space, which can be challenging in environments with sparse rewards or where the optimal policy is complex.

- Curse of dimensionality: Q-learning may suffer from the curse of dimensionality, which means that the number of states and actions can grow exponentially with the number of dimensions, making it difficult to learn optimal policies.

- Limited to discrete actions: Q-learning is limited to environments with a discrete set of actions, which can be a disadvantage in environments with continuous action spaces.

- Overestimation of Q-values: Q-learning can overestimate the Q-values for state-action pairs, especially in the presence of high variance or noisy rewards, which can result in suboptimal policies.