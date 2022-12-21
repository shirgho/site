# Tree Traversal

## Depth First Search

I.e. going through one complete branch of a tree. Following the child nodes until you hit a leaf.
Going down, basically, instead of sideways.

### Pre order DFS
Node, left node, right node

OR

We list the nodes the first time we pass them.
#### Recursive

Here, I explicitly use a helper function which is actually the one recursively called, and pass a reference to the results vector 
into each call, so the vector of nodes added is maintained.

Don't need to pass the vector/reference/pointer to vector if globally defined. 

Or if returning the vector after each function call? Would that work as well?
Yes. That would work too. But why pass a copy of the vector all the time. Reference is fine.

```
vector<int> preorderTraversal(TreeNode* root) {
        
    vector<int> preorder = {};
    
    if (!root)
        return preorder;

    preorder.push_back(root->val);
    
    preorderTraversalRec(root->left, preorder);
    preorderTraversalRec(root->right, preorder);
    
    return preorder;
}
    
void preorderTraversalRec(TreeNode* node, vector<int> &preorder) {
    if(!node)
        return;
    
    preorder.push_back(node->val);
    
    preorderTraversalRec(node->left, preorder);
    preorderTraversalRec(node->right, preorder);
}
```
#### Iterative
The Iterative version of pre order can be used just by traversing the tree through a stack, and pushing the right child first and then the left child.

```
vector<int> preorderTraversal(TreeNode* root){
    stack<TreeNode*> s = {};
    vector<int> result = {};
    
    if (root == nullptr) return result;
    s.push(root);
    
    while(stack.size()){
        TreeNode* current = stack.top();
        s.pop();
        if(current != nullptr){
            result.push_back(current->val);
            if(current->right != nullptr){
                stack.push(current->right);
            }
            if(current->left != nullptr){
                stack.push(current->left);
            }
        }    
    }
    
    return result;
        
        
}

```
However, I will use the following version, because it can be quickly adjusted for the Inorder and Post order versions.

```
// we push to result as soon as we push to stack/traverse the node
vector<int> preorderTraversal(TreeNode* root) {
        
    vector<int> result = {};
    stack<TreeNode*> s = {};
    TreeNode* last_pop = root;
    
    if(root == nullptr)
        return result;
    else {
        s.push(root);
        result.push_back(s.top()->val); 
    }
    
    while(!s.empty()){
        TreeNode* current = s.top();
        if(current->left != nullptr && last_pop != current->left && last_pop != current->right){
            s.push(current->left);
            result.push_back(s.top()->val);
        } else if (current->right != nullptr && last_pop != current->right){
            s.push(current->right);
            result.push_back(s.top()->val);
        } else {
            s.pop();
            last_pop = current;
        }
    }
    
    return result;
}

```

### In order DFS
leftNode, Node, RightNode

OR

We list the nodes the second time we pass them.

#### Recursive
```
vector<int> inorderTraversal(TreeNode* root) {
        
    vector<int> inorder = {};
    
    if (!root)
        return inorder;

    inorderTraversalRec(root->left, inorder);
    inorder.push_back(root->val);
    inorderTraversalRec(root->right, inorder);
    
    return inorder;
}
    
void inorderTraversalRec(TreeNode* node, vector<int> &inorder) {
    if(!node)
        return;
    
    inorderTraversalRec(root->left, inorder);
    inorder.push_back(node->val);
    inorderTraversalRec(node->right, inorder);
}
```


#### Iterative
Here is the pushing right and left to stack version:
```
vector<int> inorderTraversal(TreeNode* root) {
    vector<int> r = {};
    stack<TreeNode*> s;
    stack<TreeNode*> w;
    
    if(root == nullptr) 
        return r;
    else 
        s.push(root);
    
    while(!s.empty()){
        
        TreeNode* current = s.top();
        TreeNode* prev;
        if(!w.empty())
                prev = w.top();
        else
            prev = nullptr;
        
        // compare with previously_popped    
        if(prev != nullptr){
            cout << "prev: " << prev->val << endl;
            // if current is not child of w.top(), then push w.top() to r and w.pop()
            if(current != prev->right && current != prev->left){
                cout << "current: " << current->val << endl;
                cout << "r1: " << prev->val << endl;
                r.push_back(prev->val);
                w.pop();
                continue;
                
            } 
            // if current is right child of w.top(), push w.top() to r, and w.pop() 
            if(current == prev->right){
                cout << "r2: " << prev->val << endl;
                r.push_back(prev->val);
                w.pop();
            }
                
        } 
        // push current to w for next cycle comparisons
        s.pop();
        w.push(current);
        
        // check if has left and/or right child
            // if so, push children to stack
        if(current->right != nullptr){
            s.push(current->right);
        }
        if(current->left != nullptr){
            s.push(current->left);
        }
        // if no child
            // push to r
            // pop w so we don't have this child node for next cycle comparisons
        if(current->left == nullptr && current->right == nullptr){
            r.push_back(current->val);
            cout << "r: " << current->val << endl;
            w.pop();
        }
            
    }     
    
    while(!w.empty()){
        TreeNode* prev = w.top();
        r.push_back(prev->val);
        w.pop();
    }
    
    return r;
        
}
```

Here is the easy to adjust version:
```
// we push to result if leaf, or if doesn't have right child (because means we are returning from some leaf nodes)
vector<int> inorderTraversal(TreeNode* root) {
        
    vector<int> result = {};
    stack<TreeNode*> s = {};
    TreeNode* last_pop = root;
    
    if(root == nullptr)
        return result;
    else {
        s.push(root); 
    }
    
    while(!s.empty()){
        TreeNode* current = s.top();
        if(current->left != nullptr && last_pop != current->left && last_pop != current->right){
            s.push(current->left);
        } else if (current->right != nullptr && last_pop != current->right){
            result.push_back(current->val);
            s.push(current->right);
        } else {
            s.pop();
            last_pop = current;
            if(current->right == nullptr)
                result.push_back(current->val);
        }
    }
    
    return result;
}
```

### Post order DFS
leftNode, RightNode, Node

OR

We list the nodes the last time we pass them.

#### Recursive
```
vector<int> postorderTraversal(TreeNode* root) {
        
    vector<int> postorder = {};
    
    if (!root)
        return postorder;

    postorderTraversalRec(root->left, postorder);
    postorderTraversalRec(root->right, postorder);
    postorder.push_back(root->val);
    
    return postorder;
}
    
void postorderTraversalRec(TreeNode* node, vector<int> &postorder) {
    if(!node)
        return;
    
    postorderTraversalRec(root->left, postorder);
    postorderTraversalRec(node->right, postorder);
    postorder.push_back(root->val);
}
```

#### Iterative
Here is the pushing right and left to stack version:
```
vector<int> postorderTraversal(TreeNode* root){
       
        stack<TreeNode*> w = {};
        stack<TreeNode*> s = {};
        vector<int> r = {};
        
        if(root == nullptr) 
            return r;
        else
            s.push(root);
        
        TreeNode* pushed = nullptr;
        while(!s.empty()){
            
            TreeNode* popped = s.top();
            s.pop();
            
            while(pushed != nullptr){
                if(pushed->left != popped && pushed->right != popped){
                    r.push_back(pushed->val);  
                    w.pop();
                    pushed = w.top();
                } else {
                    break;
                }
            } 
            w.push(popped);
            
            if(popped -> right != nullptr){
                s.push(popped -> right);
                pushed = w.top(); 
            }
            if(popped -> left != nullptr){
                s.push(popped -> left);
                pushed = w.top(); 
            }
            if(popped -> left == nullptr && popped -> right == nullptr){
                r.push_back(popped->val);
                w.pop();
                if(!w.empty())
                    pushed = w.top();      
            }
                 
        }
        
        while(!w.empty()){
            r.push_back(w.top()->val);
            w.pop();
        }
        
        return r;
    }   
```

Here is the easy to adjust version:
```
// we push to result if leaf, or if doesn't have right child (because means we are returning from some leaf nodes)
vector<int> postorderTraversal(TreeNode* root) {
        
    vector<int> result = {};
    stack<TreeNode*> s = {};
    TreeNode* last_pop = root;
    
    if(root == nullptr)
        return result;
    else {
        s.push(root); 
    }
    
    while(!s.empty()){
        TreeNode* current = s.top();
        if(current->left != nullptr && last_pop != current->left && last_pop != current->right){
            s.push(current->left);
        } else if (current->right != nullptr && last_pop != current->right){
            s.push(current->right);
        } else {
            s.pop();
            last_pop = current;
            result.push_back(current->val);
        }
    }
    
    return result;
}
```

## Breadth First Search

I.e. going level by level of the tree. Not going down one complete branch to its leaves.

No preorder, inordering etc here at least.

But should be some recursive way?

First, the iterative this time, and using a queue instead of stack.


### Simple Iterative version using queue

This returns a simple list of the bfs earched nodes.


```
vector<int> levelOrder(TreeNode* root) {
        queue<TreeNode*> q = {};
        vector<int> results = {};
        
        if(root == nullptr)
            return results;
        else
            q.push(root);
        
        TreeNode* prev = root;
        while(!q.empty()){
            
            TreeNode* current = q.front();
            q.pop();

            results.push_back(current->val);
            
            if(current -> left != nullptr){
                q.push(current->left);
            }
            if(current -> right != nullptr){
                q.push(current->right);
            }
                   
        }
        

        return results;
        
}

```

#### Returning Vector of Vectors

So as to group the levels seperately:

My own logic, which is kinda painful as always:

// Push nodes in level to queue
// Pop node and add its children to queue
// In affect, going through the queue is going through level traversal
// as the current level's nodes are popped first, FIFO, then their children come to top

// have to return vector of vectors
// currently, I check if prev node is parent of current node. if so, make a new vector and add to this, so new level.
// I could extend this check to prev and prevprev node, to cover right child as well
// or I could use the fact that we have a binary tree, and introduce a new vector after every two elements?
// unfortunately no, because there can be from 0 up to 2x children in a level, where x is number of nodes in prev level

// now have a temp array, and I check against this temp array with the current node
// if any nodes in the temp array are parents of current node, then I add the temp array to answer and clear it
// and start adding the current node and next ones to the temp array
// this should continue until we go a level down, which means current node is a child of one of the temp array nodes

// Also important to take care that root isn't added twice to the prev array, otherwise the child would be added twice to different blocks in the answer.


```
vector<vector<int>> levelOrder(TreeNode* root) { 
        queue<TreeNode*> q = {};
        vector<TreeNode*> prev = {};
        vector<vector<int>> results = {};
        vector<int> result = {};
        
        if(root == nullptr)
            return results;
        else {
            q.push(root);
        }
            
        
        while(!q.empty()){
            
            bool levelFlag = 0;
            TreeNode* current = q.front();
            q.pop();

            
            if(current -> left != nullptr){
                q.push(current->left);
            }
            if(current -> right != nullptr){
                q.push(current->right);
            }
            
            // if current is child of prev, then add result array to results, clear it, and add current to result
            for(TreeNode* prevNode : prev ){
                if(current == prevNode->left || current == prevNode->right){   
                    levelFlag = 1;
                    results.push_back(result);
                    
                    result.clear();
                    result.push_back(current->val);
                    
                    prev.clear();
                    prev.push_back(current);

                } 
                
            }
              
            if(!levelFlag){
                result.push_back(current->val);
                prev.push_back(current);
            }
                
            
        }
        
        if(!result.empty()){
            results.push_back(result);
        }
        
        return results;
        
    }
}

```

And here is some logic I adapted from the discussion section, which just uses a for loop to go through one iteration of the queue.
Becuase that must be the end of the level. 
Then the next while loop iteration starts another for loop iteration, which only covers the queue size of the previous rounds added children to the queue.
Much cleaner. And works using the queue property of adding to the back and popping from the front. The first in ones are the first outs.

```
vector<vector<int>> levelOrder(TreeNode* root) { 
    if(root == nullptr)
        return {};
        
    vector<vector<int>> answer;
    queue<TreeNode*> level;
    vector<int> temp;
    
    level.push(root);
    while(!level.empty()){
        int size = level.size();
        TreeNode* node;
        
        //go through all elements in queue (which were stored in queue before the for loop starts)
        for(int i = 0; i < size; i++){
            // pop and get top node of queue
            node = level.front();
            level.pop();

            // push children of popped top node to queue
            if(node == nullptr)
                continue;
            if(node->left != nullptr)
                level.push(node->left);
            if(node->right != nullptr)
                level.push(node->right);
            
            // push popped node to temp array
            temp.push_back(node->val);
        }  
        
        //after for loop done, means level done, because went through previously pushed children in queue
        answer.push_back(temp);
        temp.clear();
    }    
    
    return answer;

```