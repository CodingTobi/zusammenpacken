import { Server } from 'socket.io'
import { ItemsState } from './types'


const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = process.env.SOCKET_IO_PORT || 3001
console.log("env", process.env.SOCKET_IO_PORT);

const itemsState: ItemsState = {
  "container1": {
    id: "container1",
    title: "Container1_title",
    items: [
      { id: "1", text: "Item 1", checked: false },
      { id: "2", text: "Item 2", checked: true },
    ]
  },
  "container2": {
    id: "container2",
    title: "Container2_title",
    items: [
      { id: "3", text: "Item 3", checked: false },
      { id: "4", text: "Item 4", checked: false },
      { id: "5", text: "Item 5", checked: false }
    ]
  }
};


const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('a user connected')

  // Send the initial state to all clients
  socket.emit("init", itemsState);

  //client sends this request on initial load or reload
  socket.on("requestInit", () => {
    socket.emit("init", itemsState);
  });


  socket.on('item:check', ({ containerId, id, checked }) => {
    console.log('item:check', containerId, id, checked);
    itemsState[containerId].items = itemsState[containerId].items.map((item) => {
      if (item.id === id) {
        return { ...item, checked };
      }
      return item;
    });
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });

  socket.on('item:edit', ({ containerId, id, text }) => {
    console.log('item:edit', containerId, id, text);
    itemsState[containerId].items = itemsState[containerId].items.map((item) => {
      if (item.id === id) {
        return { ...item, text };
      }
      return item;
    });
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });

  socket.on('item:delete', ({ containerId, id }) => {
    console.log('item:delete', containerId, id);
    itemsState[containerId].items = itemsState[containerId].items.filter((item) => item.id !== id);
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });


  socket.on('container:addItem', ({ containerId, text, checked }) => {
    console.log('container:addItem', containerId, text, checked);
    const id = Math.random().toString(36).slice(7);
    itemsState[containerId].items.push({ id, text, checked });
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });

  socket.on('container:editTitle', ({ containerId, title }) => {
    console.log('container:editTitle', containerId, title);
    itemsState[containerId].title = title;
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });

  socket.on('container:delete', ({ containerId }) => {
    console.log('container:delete', containerId);
    delete itemsState[containerId];
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });

  socket.on('room:addContainer', ({ roomId, title }) => {
    //TODO: implement room functionality
    const containerId = Math.random().toString(36).slice(7);
    itemsState[containerId] = {
      id: containerId,
      title,
      items: []
    };
    io.emit('init', itemsState);
    console.log('updateState', itemsState);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})
