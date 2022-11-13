import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import formStyle from '../../styles/myRecipes/myRecipes.module.css'
import NativeSelect from '@mui/material/NativeSelect';


const SelectForm = (props) => {
    const { options, label, sx, selectOption, name } = props
    const [option, setOption] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
        selectOption(name, event.target.value)
    };


    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {label}
                </InputLabel>
                <NativeSelect
                    defaultValue=''
                    onChange={(e) => handleChange(e)}
                    value={option}
                    inputProps={{
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