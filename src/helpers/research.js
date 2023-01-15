import projectsJson from '../data/TIProjectTemplate.json';
import techsJson from '../data/TITechTemplate.json';

export function findResearch(researchName) {
    if (researchName.startsWith('Project_')) {
        return projectsJson.find(r => r.dataName === researchName);
    }

    return techsJson.find(r => r.dataName === researchName);
}

export function researchType(researchName) {
    if (researchName.startsWith('Project_')) {
        return 'Faction';
    }

    return 'Global';
}