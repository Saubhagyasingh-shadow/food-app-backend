
    //ab tak toh flag se kar le rhe the ki function kaise chlega par hum chahte hain ko yeh bdle jldi jldi agr 
    //user logged in hai ya nhi toh isk lie cookies use krenge kyunki owhli jab cookies send from server to browser it gets stored in browser so next time jab koi request maarne aayega toh hum cookies mein ek send kar denge ki logged in ki ni
    //let flag=true;// user logged in or not
    const jwt=require('jsonwebtoken');
    const {jwt_key}=require('secrets.js')
