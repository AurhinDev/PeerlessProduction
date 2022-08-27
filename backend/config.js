require("dotenv").config();

const { PRIVATE_KEY, RPC_URL } = process.env;

module.exports = {
    mumbai: {
        url: RPC_URL,
        accounts: [ PRIVATE_KEY ]
    },
    ethereum: {
        url: RPC_URL,
        accounts: [ PRIVATE_KEY ] 
    }
    /*
    More networks
    
    mumbai: {
        url: RPC_URL,
        accounts: [ PRIVATE_KEY ]
    }
    */
}