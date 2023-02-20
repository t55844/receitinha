import * as React from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { ICssInputForm } from './Form';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';

interface ISelectFormProps {
    option: string | number | readonly string[]
    options: string[]
    label: string
    sx: ICssInputForm
    selectOption: UseFormSetValue<any>
    name: string
}

const SelectForm = (props: ISelectFormProps) => {
    const { option, options, label, sx, selectOption, name } = props


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        selectOption(name, event.target.value)
    };


    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {label}
                </InputLabel>
                <NativeSelect
                    onChange={(e) => handleChange(e)}
                    value={option}

                    inputProps={{
                        value: option,
                        role: `select-${label}`,
                        name: name,
                        id: 'uncontrolled-native',
                    }}
                >
                    {options.map(option => <option role='option' key={Math.random()} value={option}>{option}</option>)}
                </NativeSelect>
            </FormControl>
        </Box >
    );
}


export default SelectForm