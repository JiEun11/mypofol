const { MongoDB, Account } = require('../model');

MongoDB.connect();


(async () => {
    let result;

    result = await Account.deleteMany({});
    console.log(result);

    result = await new Account({name: '안대혁', apssword: '1234'}).save();
    console.log(result);

    result = await Account.find({});
    console.log(result);

})();
