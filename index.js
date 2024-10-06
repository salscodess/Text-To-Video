const server = require('server');
const { get } = server.router;
const { file } = server.reply;

const getHome = get('/', () => file('index.html'));

server(getHome);