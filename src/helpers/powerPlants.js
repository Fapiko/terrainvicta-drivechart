import drivesJson from '../data/TIDriveTemplate.json';

function parsePowerPlantsFromDrives() {
    const powerPlants = [];

    drivesJson.forEach(drive => {
        if (drive.dataName.slice(-2) !== 'x1') {
            return;
        }

        if (!powerPlants.includes(drive.requiredPowerPlant)) {
            powerPlants.push(drive.requiredPowerPlant);
        }
    });

    return powerPlants;
}

export const parsedPowerPlants = parsePowerPlantsFromDrives();
