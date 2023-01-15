import {parsedPowerPlants} from '../../helpers/powerPlants';
import {FormControlLabel, FormGroup, FormLabel, Switch} from '@mui/material';
import {useState} from 'react';

const PowerPlants = (props) => {
    const [firstLoad, setFirstLoad] = useState(true);

    let filters = {...props.filters};

    const onToggleHandler = (e) => {
        filters[e.target.value] = e.target.checked;
        props.setFilters(filters);
    };

    if (firstLoad) {
        parsedPowerPlants.forEach(powerPlant => {
            filters[powerPlant] = true;
        });

        setFirstLoad(false);
        props.setFilters(filters);
    }

    const powerPlants = parsedPowerPlants.map(powerPlant => {
        return (
            <FormGroup key={powerPlant} sx={{m: 1}}>
                <FormControlLabel control={<Switch onChange={onToggleHandler}
                                                   checked={(filters[powerPlant] ===
                                                       undefined) ? true : filters[powerPlant]}
                                                   value={powerPlant}/>}
                                  label={powerPlant.replaceAll('_', ' ')}/>
            </FormGroup>);
    });

    return (
        <>
            <div><FormLabel component="legend">Power Plants</FormLabel></div>
            {powerPlants}
        </>
    )
}

export default PowerPlants;