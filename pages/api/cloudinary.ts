const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.IMG_CLOUD_NAME,
    api_key: process.env.IMG_API_KEY,
    api_secret: process.env.IMG_API_SECRET
})

export async function uploadImage(base64: string) {


    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        width: 400,
        height: 300,
        crop: 'fill'
    };

    const result = await cloudinary.uploader.upload(base64, options);
    return result.public_id;

}



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const data = req.body
        console.log(cloudinary)
        const uploudResult = await uploadImage(data)
        if (uploudResult.error) {
            return res.status(400).json({ error: true, msg: 'error' })

        } else {
            data.img = uploudResult;
            return res.status(200).json({ error: false, msg: 'success', data })

        }
    }

}