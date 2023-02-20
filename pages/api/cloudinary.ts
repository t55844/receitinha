import { NextApiRequest, NextApiResponse } from "next";
import { IRecipeForm } from "../../js/interface_and_ultils/interface";
import { IResponse } from "./recipes";

const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.IMG_CLOUD_NAME,
    api_key: process.env.IMG_API_KEY,
    api_secret: process.env.IMG_API_SECRET
})

export async function uploadImage(base64: string): Promise<string> {



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
        const data: IRecipeForm = req.body
        const uploudResult: string = await uploadImage(data)
        if (uploudResult.error) {
            const response: IResponse = { error: true, msg: 'error' }
            return res.status(400).json(response)

        } else {
            data.img = uploudResult;
            const response: IResponse = { error: false, msg: 'success', data }

            return res.status(200).json(response)


        }
    } else {
        const response: IResponse = { error: true, msg: 'Metodo nao permitido' }

        return res.status(400).json(response)
    }

}