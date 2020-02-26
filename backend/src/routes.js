import { resolve } from 'path';
function use(controller = '') {
    if(controller.split('.').length < 2) {
        console.log("Error in route, unespected controller");
        return new Error('Error in route, unespected controller');
    }
    const splitedController = controller.split('.');
    const Controller = require(resolve(__dirname, 'app', 'controllers', splitedController[0]));
    return Controller[splitedController[1]];

}
module.exports = (app) => {
    app.get('/', use('IndexController.index'));
    app.post('/user', use('UserController.store'));
    app.post('/login', use('UserController.login'));
    app.get('/messages', use('MessageController.index'));
    app.post('/messages', use('MessageController.store'));
}