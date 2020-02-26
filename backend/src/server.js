import app from './app';
const io = require('socket.io')(app.getServer());
const port = 3780;
app.addHook((req,res,next) => {
    req.io = io;
    next();
})
app.init(port, (req,res) => {
    console.log(`Server is running on port ${port}`);
})