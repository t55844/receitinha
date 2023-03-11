import formStyle from '../../styles/myRecipes.module.css'
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import { colors } from '../MaterialUI/theme';
import { CldImage } from 'next-cloudinary';
import { ICssInputForm } from './Form';
import { toBase64 } from '../../js/interface_and_ultils/converters';

interface ICurrentImage {
    alt: string,
    url: string | ArrayBuffer
}
interface IImageInput {
    styleInput: ICssInputForm
    setBase64img(base64: string): void
}
const ImageInput = (props: IImageInput) => {
    const { styleInput, setBase64img } = props
    const { register, getValues } = useFormContext()
    const [url, setUrl] = useState<string>(getValues('img'))
    const [alt, setAlt] = useState<string>(getValues('imgAlt'))
    const submitMethod: 'create' | 'update' = useSelector((state) => state.recipeGeren.submitMethod)

    return (
        <div style={{ ...styleInput, background: `${colors.primaryLigth}`, borderRadius: '8px', padding: '18px' }}>
            <Typography
                variant="subtitle1"
            >
                Escolha uma imagem
            </Typography>
            <input
                {...register('img')}
                onChange={e => {

                    const reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = async event => {
                        setUrl(event.target.result)
                        const base64 = await toBase64(e.target.files[0])
                        setBase64img(base64)
                    }
                }}

                aria-label="entrada de imagem"
                id="image_upload_input_recipes"
                className={formStyle.uploadeImgButton}
                style={styleInput}
                type="file"
                accept="image/png, image/jpg"
            />

            {
                submitMethod === 'update' && getValues('img') !== '' && !/\.jpg/.test(getValues('img')) ?
                    <CldImage src={url} width={300} height={300} /> :
                    < Image style={{ background: 'white', padding: '18px' }} alt={alt} src={url} width={300} height={300} />

            }



        </div>


    )
}


export default ImageInput