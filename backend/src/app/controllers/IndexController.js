class IndexController {
    async index(req,res) {
        return res.send({message: 'Hello world'});
    }

    
}

module.exports = new IndexController();