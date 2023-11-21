const { User } = require('../models');

const seedUsers = async () => {
    const userData = [
        {
            first_name: "Megan",
            last_name: "Sargent",
            date_of_birth: "10-06-2000",
            email: "megan@sargent.com",
            password: "melon"
        },
        {
            first_name: "Ben",
            last_name: "Rodriguez-Moran",
            date_of_birth: "08-22-2003",
            email: "ben@rodriguez.com",
            password: "melon"
        },
        {
            first_name: "Becca",
            last_name: "Lee",
            date_of_birth: "05-10-1990",
            email: "becca@lee.com",
            password: "melon"
        }
    ];

    // create users in db 
    const seededUsers = await User.bulkCreate(userData, { individualHooks: true });

    // map for user reference with key value pair as email: is
    const userMap = new Map();
    seededUsers.forEach((user) => {
        userMap.set(user.email, user);
    });

    // return the created users to use in postData.js 
    return userMap;
}


module.exports = seedUsers;