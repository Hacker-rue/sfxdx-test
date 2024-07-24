const { ethers } = require("ethers");
require('dotenv').config();

async function sendTransaction() {
    // Параметры подключения к Ethereum сети
    const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL);
    
    // Мнемоническая фраза отправителя
    const mnemonic = 'spike term around question citizen electric note slow second adjust fox mention';
    
    // Создание кошелька с использованием мнемонической фразы и провайдера
    const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(provider);
    
    // Адрес смарт-контракта
    const contractAddress = '0xa26761BC436aC2b280c092D1D6FCa56e9728cbb8';
    
    // ABI смарт-контракта
    const abi = [{"inputs":[{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"oldFeeRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newFeeRate","type":"uint256"}],"name":"FeeRateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"}],"name":"OrderCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenA","type":"address"},{"indexed":false,"internalType":"address","name":"tokenB","type":"address"},{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"isMarket","type":"bool"}],"name":"OrderCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"matchedId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountPaid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountLeftToFill","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"feeRate","type":"uint256"}],"name":"OrderMatched","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"name":"createOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getAccumulatedFeeBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getOrderId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOrderIdLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getOrderInfo","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"from","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"name":"getUserOrderIds","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getUserOrderIdsLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"matchedOrderIds","type":"uint256[]"},{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"bool","name":"isMarket","type":"bool"}],"name":"matchOrders","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFeeRate","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"withdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    
    // Создание объекта контракта
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    
    const gasOptions = {
      gasLimit: ethers.parseUnits('1000000', 'wei'),
      gasPrice: ethers.parseUnits('20', 'gwei') // замените на нужную цену газа
    };

    // Параметры для отправки транзакции
    const someParameter = ["0x471D43F4Ac60A908925b6EFA8EB10CAe52FAF5FA", 
      "0x59C8D65B6583232e1B4527612462684e85dC5ABa", 
      ethers.parseUnits('25.0', 18), ethers.parseUnits('25.0', 18)]
      
    // Отправка транзакции
    const tx = await contract.matchOrders(['79461798496493531788682721834080981251011667340862911687086944795909277414600', '57184409737811880483505188058546649238639688517544701700733327062542349219599'],
      someParameter[1], someParameter[0], someParameter[2], someParameter[2], true
    )

    // Ожидание подтверждения транзакции
    console.log('Отправка транзакции...');
    const receipt = await tx.wait();
    
    console.log('Транзакция подтверждена:', receipt.transactionHash);
}

sendTransaction().catch(console.error);