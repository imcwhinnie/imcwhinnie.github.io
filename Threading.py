#A hell a lot of imports
import socket
import _thread
import threading
from tkinter import *
from queue import Queue
import select
from tkinter.scrolledtext import ScrolledText
import time

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('1.1.1.1', 80))
    my_ip = s.getsockname()[0]
    s.close()
    return my_ip

ip = get_ip_address().split('.')
stem = ip[0] + '.' +  ip[1] + '.'
ips = []
unfound_lock = threading.Lock()
unfound = True
q = Queue()
def ipScan(subnet, address):
    global unfound
    maybe_aye = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        target = (stem + str(subnet) + '.' + str(address)).replace(' ','')
        maybe_aye.settimeout(0.05)
        maybe_aye.connect((target, 5555))
        ips.append(target)
        maybe_aye.close()
        unfound = False
    except Exception as e:
        #print('Error on line {}'.format(sys.exc_info()[-1].tb_lineno), type(e).__name__, e)
        pass
def threader():
    while True:
        with unfound_lock:
            if unfound == False:
                break
        (subnet, worker) = q.get()
        ipScan(subnet, worker)
        q.task_done()
    return
for x in range(400):
        t = threading.Thread(target=threader)
        t.daemon = True
        t.start()

for subnet in range(256):
    for worker in range(256):
        q.put((subnet, worker))

while unfound:
    q.join()

class GUI():
    def __init__(self, target, port):
        self.s=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.s.connect((target, port))
        self.root = Tk()
        self.root.title('Python Socket Group Chat')
        self.root.minsize(width=400, height=300)
        self.messagesLabel = ScrolledText(self.root)
        self.messagesLabel.config(width=40, height=15, state=DISABLED)
        self.typeMessage = Entry(self.root, text = 'Type here')
        self.sendMessage = Button(self.root, text = 'Send')
        self.messagesLabel.pack()
        self.typeMessage.pack()
        self.sendMessage.pack()


    def inputer(self, this_is_an_argument_for_the_sake_of_it=0):
        self.s.send(str.encode(self.typeMessage.get()))
        self.typeMessage.delete(0, 'end')

    def printer(self):
        time.sleep(1)
        while True:
            self.r,self.w,self.e = select.select([self.s],[],[],1.0)
            if self.r:
                self.final_data = b''
                while True:
                    self.data=(self.s.recv(2048))
                    self.final_data += self.data
                    if len(self.data) < 2048:
                        break
                self.messagesLabel.config(state=NORMAL)
                self.messagesLabel.insert(END, (self.data.decode('utf-8') +'\n'))
                self.messagesLabel.config(state=DISABLED)
    def main(self):
        self.sendMessage['command'] = self.inputer
        self.root.bind('<Return>', self.inputer)
        self.printer_thread = threading.Thread(target = self.printer)
        self.printer_thread.daemon = True
        self.printer_thread.start()
        self.root.mainloop()

chat = GUI(ips[0], 5555)
chat.main()


