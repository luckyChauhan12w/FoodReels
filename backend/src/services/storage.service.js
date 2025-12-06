import ImageKit, { toFile } from "@imagekit/nodejs";


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer, fileName) {
    const fileObj = await toFile(buffer, fileName);

    const result = await imagekit.files.upload({
        file: fileObj,
        fileName,
        folder: "/Zomato_Project_Videos"
    });

    return result;
}


export { uploadFile }