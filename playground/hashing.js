require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const rahas_thak = process.env.RAHAS_THAK;

var password = '123pass!';


bcrypt.genSalt(15, (err, salt) => {
    console.log('Salt is ', salt);
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('Hashed value is :', hash);
    });
});


//var hashedPassword = '$2a$10$kGx2xlI4flxU0OBsOtpwiOPPu4GJr.9GmYahemVwfW.UbbBaxtu6G';
var hashedPassword = '$2a$10$E.Q3DbvD9ussVGytB3k3KukNcIVpvoHMJ78hFlhSe18HwgonnJ07G';
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log('Result', res);
});


// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, rahas_thak);
// console.log(token);
//
// var decoded = jwt.verify(token, rahas_thak);
// console.log("Decoded value is ", decoded);


//
// const {
//     SHA256
// } = require('crypto-js');
//
//
// var message = "Hello new  world";
//
// var messageHash = SHA256(message).toString();
//
// console.log(message);
// console.log(messageHash);
//
//
// var data = {
//     id: 4
// };
//
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + rahas_thak).toString()
// };
//
//
// var resultHash = SHA256(JSON.stringify(token.data) + rahas_thak).toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed!');
// }
