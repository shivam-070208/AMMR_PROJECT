const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,//replace it with your cloud name
    api_key:process.env.CLOUDINARY_APIKEY,// replace it with your cloud api
    api_secret:process.env.CLOUDINARY_APISECRET // replace it with your cloud secret
})

 const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'pizza_items' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        stream.end(fileBuffer);
      });
    };

module.exports = streamUpload;