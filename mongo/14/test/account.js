const { Account } = require('../models');

(async () => {
    let result;
    
    // Account.counterReset('id', (err) => console.error(err));

    result = await Account.deleteMany({});
    console.log(result);

    // 1
    const newAccount = new Account({
        name: 'kickscar',
        email: 'kickscar@gmail.com',
        status: null,
        pssword: '1234'});
    result = await newAccount.save();

    //2. 
    result = await Account.create({
        name: 'kickscar',
        email: 'kickscar@gmail.com',
        status: null,
        pssword: '1234'});

    console.log(result);

    result = await Account.find({});
    console.log(result);

})();
