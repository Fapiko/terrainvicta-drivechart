import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryScatter,
    VictoryTheme,
    VictoryZoomContainer,
} from 'victory';
import drivesJson from '../../data/TIDriveTemplate.json';
import DriveLabel from './DriveLabel';
import {useState} from 'react';
import DriveInfo from './DriveInfo';

const normalizedDrives = [];

let classifications = [];
let powerPlants     = [];
drivesJson.forEach(drive => {
    if (drive.dataName.slice(-2) !== 'x1') {
        return;
    }

    normalizedDrives.push(
        {
            ...drive,
            dataName:     drive.dataName.slice(0, -2),
            friendlyName: drive.friendlyName.slice(0, -3),
        });

    if (!classifications.includes(drive.driveClassification)) {
        classifications.push(drive.driveClassification);
    }

    if (!powerPlants.includes(drive.requiredPowerPlant)) {
        powerPlants.push(drive.requiredPowerPlant);
    }
});

const Drives = (props) => {
    const [driveInfo, setDriveInfo] = useState('');

    const drives = normalizedDrives;

    let plotPoints = [];

    drives.forEach(drive => {
        if (!props.filters[drive.requiredPowerPlant]) {
            return;
        }

        if (props.driveSearch !=
            '' &&
            !drive.dataName.toLowerCase().includes(props.driveSearch.toLowerCase())) {
            return;
        }

        const plotPoint = {
            x:        drive.EV_kps,
            y:        drive.thrust_N / 1000,
            name:     drive.friendlyName,
            dataName: drive.dataName,
        }

        plotPoints.push(plotPoint);
    });

    const labelClickedHandler = (driveName) => {
        setDriveInfo(driveName);
    }

    const clearDriveInfo = () => {
        setDriveInfo('');
    }

    let driveInfoModal = <></>;
    if (driveInfo !== '') {

        driveInfoModal =
            <DriveInfo drive={drives.find(drive => drive.dataName === driveInfo)}
                       onClose={clearDriveInfo}/>
    }

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domain={{x: [1, 150000], y: [1, 150000]}}
            scale={{x: 'log', y: 'log'}}
            containerComponent={
                <VictoryZoomContainer/>
            }
        >
            <VictoryLabel y={20} text="Terra Invicta Drive Chart" textAnchor="left"/>
            <VictoryScatter
                style={{data: {fill: '#c43a31'}}}
                size={1}
                data={plotPoints}
                labels={({datum}) => datum.name}
                labelComponent={<DriveLabel clickHandler={labelClickedHandler} dy={8}/>}
            />
            <VictoryAxis dependentAxis label="Thrust (kN)"
                         style={{
                             tickLabels: {fontSize: 6},
                             axisLabel:  {fontSize: 10, padding: 30},
                         }}/>
            <VictoryAxis label="ΔV (kPs)"
                         style={{
                             tickLabels: {fontSize: 6},
                             axisLabel:  {fontSize: 10, padding: 30},
                         }}/>
            {driveInfoModal}
        </VictoryChart>);
}

export default Drives;
