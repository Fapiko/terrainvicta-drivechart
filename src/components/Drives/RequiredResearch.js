import {findResearch} from '../../helpers/research';
import ResearchItem from './ResearchItem';

const RequiredResearch = (props) => {
    const projectName = props.name;

    let requiredResearch = <></>;
    const project        = findResearch(projectName);
    
    if (project === undefined || !('prereqs' in project)) {
        requiredResearch = <li>No research required</li>
    } else {
        requiredResearch = project.prereqs.map((prereq) => {
            return <ResearchItem name={prereq} key={prereq}/>
        });
    }

    return (
        <ul>{requiredResearch}</ul>
    )
}

export default RequiredResearch;