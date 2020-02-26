import restify from 'restify';
import router from './routes';

class App {
    hooks = [];
    constructor() {
        this.server = restify.createServer();
        this.routes();
        this.middlewares();
    }

    middlewares() {
        this.server.use(restify.plugins.bodyParser({
            
        }))
    }


    addHook(hook) {
        this.server.use(hook);
    }

    routes() {
        router(this.server);
    }

    getServer() {
        return this.server.server;
    }


    init(port, callback) {
        this.server.listen(port, callback);
    }
}

export default new App();