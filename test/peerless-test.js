const { expect } = require("chai");
const { Contract } = require("ethers");
const { ethers } = require("hardhat");

describe.only("Tests", function () {
    
    it("Should deploy all contracts", async function () {
      let owner, operator;
      let proxy, ink, ink2, factory, peer;
    [owner, operator] = await ethers.getSigners();
    // Deploy Proxy
    const UpgradableProxy = await ethers.getContractFactory("UpgradableProxy");
    proxy = await UpgradableProxy.deploy();
    await proxy.deployed();

    expect(await proxy.proxyOwner()).to.equal(owner.address);
    
    // Deploy Erc20
    const INKCoin = await ethers.getContractFactory("INKCoin");
    ink = await INKCoin.deploy();
    await ink.deployed();

    const INKCoin2 = await ethers.getContractFactory("INKCoin");
    ink2 = await INKCoin2.deploy();
    await ink2.deployed();

    expect(await ink.isController(owner.address)).to.equal(true);

    //expect(await ink.balanceOf(owner.address)).to.equal(10000000000000000000000);

    // Deploy Factory
    const Factory = await ethers.getContractFactory("PeerlessFactory");
    factory = await Factory.deploy();
    await factory.deployed();
    
    const Peero = await ethers.getContractFactory("Peer");
    peer = await Peero.deploy(
        factory.address,
        "INK",
        ink.address,
        102,
        1
        );
    await peer.deployed();

    // const Peero = await ethers.getContractFactory("Peer");
    // peer = await Peero.deploy(
    //     "INK",
    //     ink.address,
    //     );
    // await peer.deployed();

    await factory.AddPeer(ink.address, "INK");
    let firstPeerObject = await factory.GetPeerByID(0);
    console.log("First Peer", firstPeerObject);

    const firstPeerContract = await Peero.attach(
        firstPeerObject.peerAdr // The deployed contract address
      );

    let feeTest = await firstPeerContract.GetCostWithFee(10000000000);
    console.log("Fee: " + feeTest);

        
      // await expect(factory.AddPeer(ink.address, "INK")).to.be.revertedWith("Peer already registered")
    
    // await factory.AddPeer(ink2.address, "INK2");
    
    // let peers2 = await factory.GetPeers();
    // console.log("Peers2", peers2);
        

    let factoryPeer = await factory.GetPeerByID(0);
    let p2 = await factory.GetPeerByID(1);

    //console.log("P1", p);
    //console.log("P2", p2);
    //console.log("Peers", peers);

    const Peer = await ethers.getContractFactory("Peer");
    peer = await Peer.deploy(factory.address, "Ink", ink.address, 2, 0);
    await peer.deployed();



        // // Inital Checks
        expect(await peer.getContractEVMBalance()).to.equal(0);
        expect(await peer.getContractTokenBalance()).to.equal(0);
        expect(await peer.buyOrdersPosted()).to.equal(0);
        expect(await peer.buyOrdersFilled()).to.equal(0);

        await ink.mint(peer.address, ethers.utils.parseEther("100"))
        //console.log("Frxst Balance Contract: ", ink.balanceOf(peer.address));

        await expect(peer.PostBuyOrder(0, 0, {
            value: ethers.utils.parseEther("0")
        })).to.be.revertedWith("Too low order");

        await expect(peer.PostBuyOrder(100, 1000, {
            value: ethers.utils.parseEther("0")
        })).to.be.revertedWith("Insufficient EVM Currency + Fee");

        expect(await peer.GetCostWithFee(1)).to.equal(1);
        expect(await peer.GetCostWithFee(100)).to.equal(102);
        let c = await peer.GetCostWithFee(ethers.utils.parseEther("1.02"))
        //console.log(c);
        //Ethers sent needs to be more than 2%, not just 2%
        let fee = 1.02;
        let val = 1;

        await
            expect(peer.PostBuyOrder(
                (
                    ethers.utils.parseEther(val.toString())
                ),
                (
                    ethers.utils.parseEther("1")
                ), 
                {
                    value: ethers.utils.parseEther((val*fee).toString())
                }
            )
        ).to.be.revertedWith('Insufficient EVM Currency + Fee')


        await peer.PostBuyOrder(
            (
                ethers.utils.parseEther(val.toString())
            ),
            (
                ethers.utils.parseEther("1")
            ), 
            {
                value: ethers.utils.parseEther((val+fee+1).toString())
            }
        )
        // await peer.PostBuyOrder(
        //     (
        //         ethers.utils.parseEther(val.toString())
        //     ),
        //     (
        //         ethers.utils.parseEther("1")
        //     ), 
        //     {
        //         value: ethers.utils.parseEther((val+fee+1).toString())
        //     }
        // )
        await ink.approve(peer.address, ethers.utils.parseEther("10000"));
        await ink.connect(operator).approve(peer.address, ethers.utils.parseEther("10000"));
        //await peer.Approve();

        let v = "0.01"

        await peer.PostSellOrder((ethers.utils.parseEther(val.toString())),(ethers.utils.parseEther(v)));

        // let order = await peer.getOrdersByOwner(owner.address);
        // //console.log("OrderByOwner: ", order);
        // let o = await peer.getOrderByID(0);
        // console.log("O", o);
        


        //await fp2p.CancelOrder(0);
        //await expect(peer.connect(operator).CancelOrder(0)).to.be.revertedWith('Not order owner');
        //await expect(peer.CancelOrer(0)).to.be.ok;
        let orders1 = await peer.getOrderByID(0)
        let orders2 = await peer.getOrderByID(1)
        // let ordersOrg = orders.map(({id, owner, filled, cancelled, evmCurrency, token, buyToken, datecreated, indexInOrderList})=>{ 
        //     return {id, owner, filled, cancelled, evmCurrency, token, buyToken, datecreated, indexInOrderList};
        // });
        // console.log("Order1: ", orders1);
        // console.log("Order2: ", orders2);

        // // await peer.CancelOrder(0);
        // // let orders3 = await peer.getOrderByID(0)
        // // console.log("Order1Cancelled: ", orders3);

        // let tf = await peer.getTokenFeesCollected();
        // let ef = await peer.getEVMFeesCollected();

        // console.log("Token fees: ", tf); 
        // console.log("EVM fees: ", ef);

        // await peer.WithdrawFees();

        // let tf2 = await peer.getTokenFeesCollected();
        // let ef2 = await peer.getEVMFeesCollected();

        // console.log("Token fees: ", tf2); 
        // console.log("EVM fees: ", ef2);
    
        await peer.connect(operator).PostBuyOrder(
            (
                ethers.utils.parseEther(val.toString())
            ),
            (
                ethers.utils.parseEther("1")
            ), 
            {
                value: ethers.utils.parseEther((val+fee+1).toString())
            }
        )




        let b1 = await ethers.provider.getBalance(owner.address);
        let b2 = await ethers.provider.getBalance(operator.address);
        console.log("BALANCE", b1)
        console.log("BALANCE", b2)
        // expect(await peer.FillBuyTokenOrder(2)).to.be.ok;
        // expect(await peer.connect(operator).FillSellTokenOrder(1,
        //     {
        //         value: ethers.utils.parseEther("3")
        //     })).to.be.ok;

            // let orders4 = await peer.getOrderByID(1)
            // console.log("Orders1Filled: ", orders4);
            let orders5 = await peer.getOrderByID(2)
            console.log("Orders2: ", orders5);

        await peer.FillBuyTokenOrder(2)

        let orders6 = await peer.getOrderByID(2)
        console.log("Orders2Filled: ", orders6);

        let orders4 = await peer.getOrderByID(1)
        console.log("Orders1: ", orders4);
        await peer.connect(operator).FillSellTokenOrder(1,
                {
                    value: ethers.utils.parseEther("3")
                })
        let orders7 = await peer.getOrderByID(1)
        console.log("Orders1Filled: ", orders7);    
        // await peer.connect(operator).FillSellTokenOrder(1,
        //     {
        //         value: ethers.utils.parseEther("3")
        //     })

        // let orders4 = await peer.getOrderByID(1)
        // console.log("Orders1Filled: ", orders4);
        // let orders5 = await peer.getOrderByID(2)
        // console.log("Orders2Filled: ", orders5);

        //TODO
        /*
            Test fill order
            Test emergency withdrawal
            Test withdraw fees
            Test frozen limited functionality
        */

        // console.log("a", a);
        // //2nd order
        // await fp2p.PostBuyFrxstOrder(
        //     (
        //         ethers.utils.parseEther("1")
        //     ),
        //     (
        //         ethers.utils.parseEther("1")
        //     ), 
        //     {
        //         value: ethers.utils.parseEther("1.051")
        //     }
        // )

        // //3rd order
        // await fp2p.PostSellFrxstOrder(
        //     (
        //         ethers.utils.parseEther("1")
        //     ),
        //     (
        //         ethers.utils.parseEther("1")
        //     )
        // )



        // //await expect(fp2p.connect(operator).FillOrder(1)).to.be.revertedWith("Insufficient contract frxst balance");
        // let userBal = await ink.balanceOf(owner.address)
        // //console.log("PREUserBal: ", userBal);

        // //await ink.transferFrom(owner, fp2p.address, ethers.utils.parseEther("1000"))
        // await fp2p.FillOrder(1)

        // expect(await fp2p.buyOrdersPosted()).to.equal(2);
        // expect(await fp2p.sellOrdersPosted()).to.equal(1);
        // expect(await fp2p.buyOrdersFilled()).to.equal(1);
        // expect(await fp2p.sellOrdersFilled()).to.equal(0);
        // expect(await fp2p.ordersCancelled()).to.equal(1);


        // // let order2s = await fp2p.getAllActiveOrder()
        // // let ordersOrg2 = orders.map(({owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList})=>{ 
        // //     return {owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList};
        // //   });

        // // console.log("Orders: ", ordersOrg);





        // //let userBal2 = await ink.balanceOf(owner.address)
        // //console.log("POSTUserBal: ", userBal2);

        // await fp2p.FillOrder(2, 
        //     {
        //         value: ethers.utils.parseEther("1.051")
        //     })

        // let fBal3 = await fp2p.getContractFrxstBalance()
        // let mBal3 = await fp2p.getContractMaticBalance()
        // console.log("Contract FBAL: ", fBal3);
        // console.log("Contract MBAL: ", mBal3);

        // let orders2 = await fp2p.getAllActiveOrder()
        // let ordersOrg2 = orders2.map(({owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList})=>{ 
        //     return {owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList};
        // });

        // //console.log("Orders: ", ordersOrg2);

        // await fp2p.Withdraw(ethers.utils.parseEther("1"), ethers.utils.parseEther("1"))
        // let fBal = await fp2p.getContractFrxstBalance()
        // let mBal = await fp2p.getContractMaticBalance()
        // console.log("Post Contract FBAL: ", fBal);
        // console.log("Post ContractMBAL: ", mBal);
         })
  })

  it("Should set up Peer", async function () {
    
   

    
})