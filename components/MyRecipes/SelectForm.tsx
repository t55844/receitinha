import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const SelectForm = (props) => {
    const [option, setOption] = React.useState('');
    const { options, label, sx, selectOption, name } = props

    const handleChange = (event: SelectChangeEvent) => {
        setOption(event.target.value as string);
        selectOption(name, event.target.value)
    };

    return (
        <Box sx={sx}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    placeholder={options[0]}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={option}
                    label={label}
                    onChange={handleChange}
                >
                    {options.map(option => {
                        return <MenuItem key={Math.random()} value={option}>{option}</MenuItem>
                    }
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

export default SelectForm