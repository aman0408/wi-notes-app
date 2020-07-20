/*
find the destination in last row
start

stack - start, element
arr
visited

loop
if stack is not empty
    i,j =stack.peek()
    if(i,j==destination){
        //finished
    }
    if visited[i][j]==1{
        continue;
    }
    if i+1,j == 0 
        visited[i+1][j]=1
        stack.push(arr[i+1,j])
        
    else if i,j-1
        visited[i][j-1]=1
        stack.push(arr[i,j-1])
    else if i,j+1
        visited[i][j+1]=1
        stack.push(arr[i][j+1])
    else if top==0
        set visited
        push to stack
    visited[i][j]=1
    stack.pop()
*/

class Brick {

}