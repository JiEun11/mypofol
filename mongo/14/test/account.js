const { MongoDB, Account } = require('../models');

MongoDB.connect();


(async () => {
    let result;
    
    // Account.counterReset('id', (err) => console.error(err));

    result = await Account.deleteMany({});
    console.log(result);

    // result = await new Account({
    //     name: 'kickscar',
    //     email: 'kickscar@gmail.com',
    //     status: null,
    //     pssword: '1234'}).save();

    result = Account
    console.log(result);

    result = await Account.find({});
    console.log(result);

})();
