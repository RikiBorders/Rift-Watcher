'''
Used to manage threads. Threads are generally used in this app
to make requests in parallel
'''
import time

def monitor_thread_pool(pool: list):
    '''
    Given a list of threads, this function
    will loop over each thread until their workload has
    been completed.
    '''
    while pool:
        for i in range(len(pool)):
            thread = pool[i]
            if not thread.is_alive():
                pool.pop(i)
                break
            else:
                time.sleep(1)

