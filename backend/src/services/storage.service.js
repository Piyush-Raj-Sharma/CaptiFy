const imagekit = require('imagekit');

const imageKitInstance = new imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFile = async (file, fileName) => {

    const response = await imageKitInstance.upload({
        file: file, //required
        fileName: fileName, //required
        folder: "/captify"
    })
    return response;
}

module.exports = uploadFile;