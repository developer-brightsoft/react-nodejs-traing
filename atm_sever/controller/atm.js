const data = require('../data')
const { v4: uuid_v4 } = require('uuid');


// add atm
const postAtm = async(req, res)=>{
    const atmName = req.body.name
    try{
        const atm = {
            id: uuid_v4(),
            status: 'Free',
            remove: false,
            name: atmName
        } 
        data.atms.push(atm)
        return res.json(data.atms)
    }catch(err){ 
        res.json(err.message)
    }
}

// add people
const addPeople = async(req, res) => {
    const {namePeople, transaction} = req.body
    try{
        const people = {
            name: namePeople,
            transaction: transaction
        }
        data.queues.push(people)
        return res.json({
            success: true,
            message: 'Add people success !'
        })
    }catch(err){
        res.json(err.message)
    }
}

// get atm
const getAtms = (req, res) => {
    try{
        return res.json({
            atm: data.atms,
            queue: data.queues,
            processedClient: data.processedClients
        })
    }catch(err){
        res.json(err.message)
    }
   
}

// delete atm
const deleteAtm = async(req, res, next) => {
    const {atmId} = req.params
    try{
        const atm = data.atms.find(e => e.id === atmId)

        const waitForAtm = (i) => {  
            if(data.atms[i].status !== 'Free'){
                setTimeout(() => {
                    waitForAtm(i)
                }, 20);
            }else{
                data.atms.splice(i, 1)
                return res.json({
                    remove: true
                })
            }
        }

        for(i=0; i < data.atms.length; i++){
            if(data.atms[i] === atm){
                data.atms[i].remove = true
                waitForAtm(i)
            }
        }   
    }catch(err){
        res.json(err.message)
    }
} 


setInterval(() => {
    function randomPerson() {
        let text = '';
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let number = "1234";
        let person = {};
       
        for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length)
        );
        for (var i = 0; i < 1; i++)
        person.transaction = (number.charAt(Math.floor(Math.random() * number.length))
        );
    
        person.name = text
        return person;  
    }

    data.queues.push(randomPerson())
    data.transactions()
}, 1000);


module.exports = { 
    postAtm,
    deleteAtm,
    getAtms,
    addPeople
}