import {findResearch, researchType} from '../../helpers/research';
import RequiredResearch from './RequiredResearch';
import {useState} from 'react';

const ResearchItem = (props) => {
    const [expanded, setExpanded] = useState(false);

    const name     = props.name;
    const project  = findResearch(name);
    const dataName = project.dataName;

    let prereqList            = <></>
    const togglePrereqHandler = (e) => {
        setExpanded(!expanded);
    }

    if (expanded) {
        prereqList = <RequiredResearch name={name}/>
    }

    return <li
        key={dataName}>[{researchType(dataName)}] <span onClick={togglePrereqHandler}>{project.friendlyName}
    </span>
        {
            prereqList
        }
    </li>
}

export default ResearchItem;