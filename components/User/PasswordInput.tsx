import React from "react";
import { useFormContext } from "react-hook-form";

import { IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material"
import { Controller } from "react-hook-form"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FieldValues } from "react-hook-form/dist/types";

export default (props: { name: string }) => {
    const { name } = props

    const { control, register } = useFormContext<FieldValues>()

    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=''
            render={({ field }) => <OutlinedInput
                sx={{ m: 1, width: '25ch' }}
                {...field}
                id={`outlined-adornment-${name}`}

                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"

            />}
        />
    )
}