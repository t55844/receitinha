import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Form from './Form';
import MyRecipesList from './MyRecipeList';
import TitleOfSection from '../Menu/TitleOfSection';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function PageMyRecipes() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box aria-label='tabs box' sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-around' }}>
                <Tabs value={value} onChange={handleChange} >
                    <Tab label="Minhas receitas" {...a11yProps(0)} />
                    <Tab label="Enviar uma receita" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TitleOfSection text='Suas receitas' />
                <MyRecipesList />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TitleOfSection text='Escreva sua receita' />
                <Form />
            </TabPanel>
        </Box>
    );
}
