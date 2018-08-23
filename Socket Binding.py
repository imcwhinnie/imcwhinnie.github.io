#Server
import socket
import sys
from _thread import *
import threading

#Recieve messages on port 5555
#You are hosting the group chat

host=''
port = 5555

s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
clients = set()
clients_lock = threading.Lock()

try:
    s.bind((host, port))
except socket.error as e:
    print(str(e))

s.listen(5)
print('Waiting for a connection...')

last_message = ''

def threaded_client(conn,addr):
    with clients_lock:
                for c in clients:
                    if c != conn:
                        c.sendall(str.encode((addr[0] + ' joined the chat!')))
    conn.send(str.encode('Welcome to the IP chat.'))
    try:
        while True:
            #Recieve Data
            final_data = b''
            while True:
                data=(conn.recv(2048))
                final_data += data
                if len(data) < 2048:
                    break
            print(addr, ': ', final_data.decode('utf-8'))
            #Send Data
            output = ': '.join([addr[0], (final_data.decode('utf-8'))])
            output = str.encode(output)
            with clients_lock:
                for c in clients:
                    c.sendall(output)

    except:
        clients.remove(conn)
        with clients_lock:
                for c in clients:
                    if c != conn:
                        c.sendall(str.encode((addr[0] + ' left the chat!')))
        print(addr[0], ' left the chat!')
    conn.close()


while True:
    conn, addr = s.accept()
    with clients_lock:
        clients.add(conn)
    print('connected to: '+addr[0]+':'+str(addr[1]))
    start_new_thread(threaded_client,(conn,addr))
    
