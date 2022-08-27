const { expect } = require("chai");
const { ethers } = require("hardhat");

describe.only("Initial Deployment", function () {
  it("Should deploy all contracts", async function () {
    
    const [owner, operator] = await ethers.getSigners();

    // Deploy Proxy
    const UpgradableProxy = await ethers.getContractFactory("UpgradableProxy");
    const proxy = await UpgradableProxy.deploy();
    await proxy.deployed();

    expect(await proxy.proxyOwner()).to.equal(owner.address);

    // Deploy Erc20
    const INKCoin = await ethers.getContractFactory("INKCoin");
    const ink = await INKCoin.deploy();
    await ink.deployed();

    expect(await ink.isController(owner.address)).to.equal(true);

    //expect(await ink.balanceOf(owner.address)).to.equal(10000000000000000000000);

    // Deploy Erc1155
    const FP2P = await ethers.getContractFactory("FP2P");
    const fp2p = await FP2P.deploy(ink.address);
    await fp2p.deployed();

    // Inital Checks
    expect(await fp2p.getContractMaticBalance()).to.equal(0);
    expect(await fp2p.getContractFrxstBalance()).to.equal(0);
    expect(await fp2p.buyOrdersPosted()).to.equal(0);
    expect(await fp2p.buyOrdersFilled()).to.equal(0);

    await ink.mint(fp2p.address, ethers.utils.parseEther("100"))
    console.log("Frxst Balance Contract: ", ink.balanceOf(fp2p.address));

    await expect(fp2p.PostBuyFrxstOrder(0, 0, {
        value: ethers.utils.parseEther("0")
    })).to.be.revertedWith("Too low order");
    // await expect(fp2p.PostBuyFrxstOrder(100, 1000, {
    //     value: ethers.utils.parseEther("0")
    // })).to.be.revertedWith("Insufficient MATIC + Fee");

    expect(await fp2p.GetCostWithFee(1)).to.equal(1);
    expect(await fp2p.GetCostWithFee(100)).to.equal(105);

    //Ethers sent needs to be more than 5%, not just 5%
    await
        expect(fp2p.PostBuyFrxstOrder(
            (
                ethers.utils.parseEther("100")
            ),
            (
                ethers.utils.parseEther("1")
            ), 
            {
                value: ethers.utils.parseEther("1.05")
            }
        )
    ).to.be.revertedWith('Insufficient MATIC + Fee')


    await fp2p.PostBuyFrxstOrder(
        (
            ethers.utils.parseEther("100")
        ),
        (
            ethers.utils.parseEther("1")
        ), 
        {
            value: ethers.utils.parseEther("1.051")
        }
    )
    await ink.approve(fp2p.address, ethers.utils.parseEther("10000"));
    await fp2p.approve();

    let order = await fp2p.getOrdersByOwner(owner.address);
    //console.log("OrderByOwner: ", order);

    let orders = await fp2p.getAllActiveOrder()
    let ordersOrg = orders.map(({owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList})=>{ 
        return {owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList};
      });

    //console.log("Orders: ", ordersOrg);

    await expect(fp2p.connect(operator).CancelOrder(0)).to.be.revertedWith('Not order owner');
    //await fp2p.CancelOrder(0);
    await expect(fp2p.CancelOrder(0)).to.be.ok;



    
      //2nd order
      await fp2p.PostBuyFrxstOrder(
        (
            ethers.utils.parseEther("1")
        ),
        (
            ethers.utils.parseEther("1")
        ), 
        {
            value: ethers.utils.parseEther("1.051")
        }
    )

    //3rd order
    await fp2p.PostSellFrxstOrder(
        (
            ethers.utils.parseEther("1")
        ),
        (
            ethers.utils.parseEther("1")
        )
    )



    //await expect(fp2p.connect(operator).FillOrder(1)).to.be.revertedWith("Insufficient contract frxst balance");
    let userBal = await ink.balanceOf(owner.address)
    //console.log("PREUserBal: ", userBal);

    //await ink.transferFrom(owner, fp2p.address, ethers.utils.parseEther("1000"))
    await fp2p.FillOrder(1)

    expect(await fp2p.buyOrdersPosted()).to.equal(2);
    expect(await fp2p.sellOrdersPosted()).to.equal(1);
    expect(await fp2p.buyOrdersFilled()).to.equal(1);
    expect(await fp2p.sellOrdersFilled()).to.equal(0);
    expect(await fp2p.ordersCancelled()).to.equal(1);


    // let order2s = await fp2p.getAllActiveOrder()
    // let ordersOrg2 = orders.map(({owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList})=>{ 
    //     return {owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList};
    //   });

    // console.log("Orders: ", ordersOrg);
 

    


    //let userBal2 = await ink.balanceOf(owner.address)
    //console.log("POSTUserBal: ", userBal2);

    await fp2p.FillOrder(2, 
        {
            value: ethers.utils.parseEther("1.051")
        })

    let fBal3 = await fp2p.getContractFrxstBalance()
    let mBal3 = await fp2p.getContractMaticBalance()
    console.log("Contract FBAL: ", fBal3);
    console.log("Contract MBAL: ", mBal3);

    let orders2 = await fp2p.getAllActiveOrder()
    let ordersOrg2 = orders2.map(({owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList})=>{ 
        return {owner, filled, cancelled, matic, frxst, buyfrxst, indexInOrderList};
      });

    //console.log("Orders: ", ordersOrg2);

    await fp2p.Withdraw(ethers.utils.parseEther("1"), ethers.utils.parseEther("1"))
    let fBal = await fp2p.getContractFrxstBalance()
    let mBal = await fp2p.getContractMaticBalance()
    console.log("Post Contract FBAL: ", fBal);
    console.log("Post ContractMBAL: ", mBal);

})
})