const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(fileBuffer, fileName) {
    try {
        const result = await imagekit.upload({
            file: fileBuffer.toString("base64"),
            fileName: fileName,
        });

        return result;
    } catch (error) {
        console.error("❌ IMAGEKIT UPLOAD FAILED:", error.message);
        throw error;
    }
}



module.exports = {
    imagekit,
    uploadFile,
};