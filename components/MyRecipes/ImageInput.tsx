import formStyle from '../../styles/myRecipes.module.css'
import { useFieldArray, useFormContext } from "react-hook-form";

import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Image from 'next/future/image';
import { colors } from '../MaterialUI/theme';

interface ICurrentImage {
    alt: string,
    url: string | ArrayBuffer
}

export default props => {
    const { styleInput } = props
    const { register } = useFormContext()
    const [currentImage, setCurrentImage] = useState<ICurrentImage>({ alt: '', url: '' })

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

            <Image style={{ background: 'white', padding: '18px' }} alt={currentImage.alt} src={currentImage.url} width={300} height={300} />

        </div>


    )
}