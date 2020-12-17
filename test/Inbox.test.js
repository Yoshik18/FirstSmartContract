const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //get list of all accounts
    accounts = await web3.eth.getAccounts();

    //use one of the account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    it('it has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi there!');
    });

    it('it can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'bye');
    });
});


























// class Car{
//     park(){
//         return 'parked';
//     }
//     drive(){
//         return 'vroom';
//     }
// }
// let car;
// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {
//     it('has parked', () => {
//         assert.strictEqual(car.park(), 'parked');
//     });

//     it('can drive', () => {
//         assert.strictEqual(car.drive(), 'vroom');
//     });
// })