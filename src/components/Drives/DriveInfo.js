import {Box, Card, Modal, Typography} from '@mui/material';
import {findResearch, researchType} from '../../helpers/research';

const style = {
    position:  'absolute',
    top:       '50%',
    left:      '50%',
    transform: 'translate(-50%, -50%)',
    width:     400,
    bgcolor:   'background.paper',
    border:    '2px solid #000',
    boxShadow: 24,
    p:         4,
};

const DriveInfo = (props) => {
    const drive = props.drive;

    if (drive === undefined) {
        return '';
    }

    let requiredResearch = <></>

    const project = findResearch(drive.requiredProjectName);
    if (project === undefined) {
        requiredResearch = <li>No research required</li>
    } else {
        requiredResearch = project.prereqs.map((prereq) => {
            const prereqProject = findResearch(prereq);
            const dataName      = prereqProject.dataName;

            return <li key={dataName}>[{researchType(dataName)}] {prereqProject.friendlyName}</li>
        });
    }

    return (
        <Modal open={true} onClose={props.onClose}>
            <Box style={style}>
                <Card sx={{p: 1}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {drive.friendlyName}
                    </Typography>
                    <Typography sx={{mt: 2}}>
                        Required Power Plant: {drive.requiredPowerPlant.replaceAll('_', ' ')}
                    </Typography>
                    <Typography sx={{mt: 1}}>
                        Thrust: {drive.thrust_N / 1000} kN
                    </Typography>
                    <Typography>
                        ΔV: {drive.EV_kps} kps
                    </Typography>
                    <Typography sx={{mt: 1}}>
                        Efficiency: {drive.efficiency * 100}%
                    </Typography>
                    <p>Required Research</p>
                    <ul>
                        {requiredResearch}
                    </ul>
                </Card>
            </Box>
        </Modal>
    )
}

export default DriveInfo;