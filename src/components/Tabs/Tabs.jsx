import data from '../../data/tabs.json';

import Tab from "../Tab/Tab";

const Tabs = () => {

    return (
        <Tab tabs={data}></Tab>
    );
};

export default Tabs;