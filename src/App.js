import Drives from './components/Drives/Drives';
import {Box, Grid, TextField} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PowerPlants from './components/PowerPlants/PowerPlants';
import {useState} from 'react';

function App() {
    const [filters, setFilters] = useState({});
    const [search, setSearch]   = useState('');

    const setFiltersHandler = (updatedFilters) => {
        setFilters(updatedFilters);
    }

    const onSearchHandler = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={1}/>
                <Grid item xs={7}>
                    <Box sx={{width: 1, height: '90vh'}}>
                        <Drives filters={filters} driveSearch={search}/>
                    </Box>
                    <Box>
                        <TextField id="outlined-basic"
                                   label="Find Drive"
                                   variant="outlined"
                                   onChange={onSearchHandler}/>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <PowerPlants setFilters={setFiltersHandler}
                                 filters={filters}/>
                </Grid>
            </Grid>
        </>
    )

}

export default App;
