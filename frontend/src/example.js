// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider

import React, {useState} from 'react'
import {ethers} from 'ethers'

import ABI_Factory from '../../backend/abi/Factory_abi.json' // Factory som skapar Peers. Add new Pairings
import ABI_Peer from '../../backend/abi/Peer_abi.json' // Peer som hanterar en Token-pairing. Buy/Sell/Cancel
import ABI_ERC20 from '../../backend/abi/ERC20_abi.json' // Token. Approve/Allowance


const SimpleStorage = () => {

    //let activeOrders = await Peer.getAllActiveOrders() 
    /*
        [
            {
                address payable owner;
                bool filled;
                bool cancelled;
                uint evmCurrency; //ETH, MATIC etc
                uint token;
                bool buyToken;
                uint datecreated;
                uint indexInOrderList;
            }, 
            {
                address payable owner;
                bool filled;
                bool cancelled;
                uint evmCurrency; //ETH, MATIC etc
                uint token;
                bool buyToken;
                uint datecreated;
                uint indexInOrderList;
            }, 
        ]
    */

    // EVENT LISTENERS
    //Dropdown för network. Hämta networks från hårdkodad datastructure.
    {
        0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3, //Vem trigga evented?
        120, // Order ID
        200, // Token
        100  // EVM Currency
    }
    /*
    event BuyTokenOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event SellTokenOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event CancelledOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event BuyTokenOrderFilled(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event SellTokenOrderFilled(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);

    */

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	//let contractAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';
    let factoryAddress = '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3';

    //factory.GetPeerAddresses() -> [adr, adr] -> dropdown 
    
    let ethereum_tokens= [
        '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3',
        '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3',
        '0xCF31E7c9E7854D7Ecd3F3151a9979BC2a82B4fe3'
    ]

    /*
        BASICS:
        
        1. Dropdown show hardcoded networks
        2. When network is chosen, set factory address, make factoryContract object
            let factoryContract = new ethers.Contract(factoryAddress, Factory_abi, tempSigner);
            then  call factoryContract.methods.call.GetPeers(). Store result in activePeers.
        3. activePeers may look like this:
        {
            address owner;
            address peerAdr;
            uint peerID;
            uint dateCreated;
            string name;
            bool frozen;
        }
        4. 2nd dropdown adds peers by concatenting .peerAdr + .name
        5. When active peer been chosen in dropdown set local variable peerAddress to 
        .peerAdr
        6. Create a peerObject
        let peerContract = new ethers.Contract(peerAddress, Peer_abi, tempSigner);
        7. With peerContract we can now call
        peerContract.methods.allOrders() to assign all orders to local object.
        8. Order objects looks like this
        {
            address payable owner;
            bool filled;
            bool cancelled;
            uint evmCurrency; //ETH, MATIC etc
            uint token;
            bool buyToken;
            uint indexInOrderList;
        }
        Filter out all orders that are filled or cancelled, they should not be displayed
        in table.
        9. In order to get the Token address from a Peer we need to do
        let tokenAdr = peerContract.methods.tokenAdr();
        let tokenContract = new ethers.Contract(tokenAdr, ERC20_abi, tempSigner);
        10. We can then check Allowance by
        let allowance = tokenContract.methods.allowance(tempSigner, peerAddress)
        If (allowance < amountWeWantToTransact) {
            tokenContract.methods.approve(peerAddress, amountWeWantToTransact);
        }

        BUY ORDER
        
        peerContract.methods.PostBuyOrder(evmAmount, tokenAmount, {
            msg.value = evmAmount * 1.02
        });

        SELL ORDER

        peerContract.methods.PostSellOrder(evmAmount, tokenAmount);


        FILL ORDER

        let value = 0;
        if (allOrders[_orderId].!buyToken) {
            value = allOrders[_orderId].evmCurrency * 1.02
        }
        peerContract.methods.fillOrder(orderID, {
            msg.value = value
        })

        CANCEL ORDER

        peerContract.methods.cancelOrder(orderID)


        EVENT LISTENERS. Call checkEvents() once everything is fully loaded and peerContract
        has been created and everytime peerContract change.

        const checkEvents = async() => {
            peerContract.on("BuyTokenOrder", (_from, _id, _token, _evmCurrency) => {
                '_from is buying _token for _evmCurrency with orderid _id,
                add this to table for rendering.'
            })
            peerContract.on("SellTokenOrder", (_from, _id, _token, _evmCurrency) => {
                '_from is selling _token for _evmCurrency with orderid _id,
                add this to table for rendering.'
            })
            peerContract.on("CancelledOrder", (_from, _id, _token, _evmCurrency) => {
                '_from is removing their order of _id, remove it from table'
            })
            peerContract.on("BuyTokenOrderFilled", (_from, _id, _token, _evmCurrency) => {
                '_from filled an order by buying _token for _evmcurrency at orderid _id),
                remove it from table.
            })
            peerContract.on("SellTokenOrderFilled", (_from, _id, _token, _evmCurrency) => {
                '_from filled an order by selling _token for _evmcurrency at orderid _id),
                remove it from table.
            })
        }

    */

    let peerAddress = "0x0"

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract, setFactoryContract] = useState(null);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	

		let factoryContract = new ethers.Contract(factoryAddress, ABI_PeerlessFactory, tempSigner);
		setFactoryContract(factoryContract);

        let pairings = {
            "Ethereum" : [ // <- Network
                0x0,    // <- Token Adress on Network
                0x0 // <- Token Adress on Network
            ],
            "Matic" : [ // <- Network
                0x0,    // <- Token Adress on Network
                0x0 // <- Token Adress on Network
            ],
            "Avalanche" : [ // <- Network
                0x0,    // <- Token Adress on Network
                0x0 // <- Token Adress on Network
            ]
        }
        let networkFactoryAdr = {
            "Ethereum" : 0x0,
            "Matic": 0x0,
            "Avalanche" : 0x0
        }
        let networkName;
        let factoryAdr = networkFactoryAdr[networkName]

                                // GetPeers()
        // factoryContract.methods.AddPeer(0x0, "Japan Coin").call(function(err, res) {
        //     if (err) {
        //         console.log("Error", err);
        //         return;
        //     }
        //     console.log("Peer added");
        // });


        //
	}

	const setHandler = (event) => {
		event.preventDefault();
		console.log('sending ' + event.target.setText.value + ' to the contract');
		contract.set(event.target.setText.value);
	}

	const getCurrentVal = async () => {
		let val = await contract.get();
		setCurrentContractVal(val);
	}


	
	return (
		<div>
		<h4> {"Get/Set Contract interaction"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<form onSubmit={setHandler}>
				<input id="setText" type="text"/>
				<button type={"submit"}> Update Contract </button>
			</form>
			<div>
			<button onClick={getCurrentVal} style={{marginTop: '5em'}}> Get Current Contract Value </button>
			</div>
			{currentContractVal}
			{errorMessage}
		</div>
	);
}



export default SimpleStorage;