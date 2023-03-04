import formStyle from '../../styles/myRecipes.module.css'
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Typography from '@mui/material/Typography';
import Image from 'next/future/image';
import { colors } from '../MaterialUI/theme';
import { CldImage } from 'next-cloudinary';
import { ICssInputForm } from './Form';

interface ICurrentImage {
    alt: string,
    url: string | ArrayBuffer
}
interface IImageInput {
    styleInput: ICssInputForm
}
const ImageInput = (props: IImageInput) => {
    const { styleInput } = props
    const { register, getValues } = useFormContext()
    const [currentImage, setCurrentImage] = useState<ICurrentImage>({ alt: '', url: '' })
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
                onInputCapture={e => {

                    const reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = event => {

                        setCurrentImage({ alt: e.target.files[0].name, url: event.target.result })

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
                submitMethod === 'update' && currentImage.url === '' && getValues('img') !== '' ?
                    <CldImage src={getValues('img')} width={300} height={300} /> :
                    < Image style={{ background: 'white', padding: '18px' }} alt={currentImage.alt} src={currentImage.url} width={300} height={300} />

            }



        </div>


    )
}


export default ImageInput