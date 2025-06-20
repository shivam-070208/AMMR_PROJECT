const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_APISECRET
})

const upload = async (file)=>{
     try {
         const result = await cloudinary.uploader.upload(filePath, {
      folder: "items",
     });
        return result.secure_url;
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    throw err;
  }
}

module.exports = upload;