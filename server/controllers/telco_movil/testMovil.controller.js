

const testMovilController={};


testMovilController.getInfo= async(req, res) => {
    
    res.json(
        {
            code:"200",
            status: 'ok'
        }
    );
   
};
testMovilController.createTest= async(req, res) => {
    
    res.json(
        {
            code:"200",
            status: 'ok'
        }
    );
   
};



module.exports = testMovilController;