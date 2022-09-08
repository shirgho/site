# Multi Threading

## Concurrency vs Parallelism
- Parallelism, we run multiple copies of the same program simultaneously, but they are executed on different data. E.g. GPU passed different data, processed at same time, and return to some main thread. But no danger of memory access at same time here.
- Concurrent programming involves a shared memory location, and the different threads actually "read" the information provided by previous threads, and use the same variables amongst them.

https://www.educative.io/blog/modern-multithreading-and-concurrency-in-cpp

## data race
- can occur when at least two threads can cimultaneously access a cariable or memory loocation, and tries to access it. 
- can result in undefined wolfish behaviour.

