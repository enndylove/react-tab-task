import React, { useState, useRef, useEffect } from 'react';
import TabItem from '../TabItem/TabItem';
import './../../styles/Tabs.scss';

import IconAlt from '../../images/icons/fi-rs-box-alt.svg';
import IconMore from '../../images/icons/fi-rs-more.svg';
import IconDelete from '../../images/icons/cancel.svg';
import fooIcon from './../../images/icons/fi-rs-apps.svg';

const Tab = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tabList, setTabList] = useState(tabs);
    const [pinnedTabs, setPinnedTabs] = useState(new Set());
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [draggedTab, setDraggedTab] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [visibleTabs, setVisibleTabs] = useState([]);
    const [hiddenTabs, setHiddenTabs] = useState([]);
    const tabContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (tabContainerRef.current) {
                const { scrollWidth, clientWidth } = tabContainerRef.current;
                const visibleTabsCount = Math.floor(clientWidth / 150);
                const visibleTabs = tabList.slice(0, visibleTabsCount);
                const hiddenTabs = tabList.slice(visibleTabsCount);

                setVisibleTabs(visibleTabs);
                setHiddenTabs(hiddenTabs);

                setShowMore(hiddenTabs.length > 0);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [tabList]);

    const handleTabClick = (index) => {
        setActiveIndex(index);
    };

    const handlePinClick = (name) => {
        setPinnedTabs((prev) => {
            const updated = new Set(prev);
            if (updated.has(name)) {
                updated.delete(name);
            } else {
                updated.add(name);
            }
            return updated;
        });
    };

    const handleDragStart = (index, event) => {
        if (pinnedTabs.has(tabList[index].name)) {
            event.preventDefault();
            return;
        }
        setDraggedIndex(index);
        setDraggedTab(tabList[index]);
        event.dataTransfer.effectAllowed = "move";
    };

    const handleDrop = (index, event) => {
        event.preventDefault();
        if (pinnedTabs.has(tabList[index].name) || draggedIndex === null) {
            return;
        }

        const newTabs = [...tabList];
        const [draggedTab] = newTabs.splice(draggedIndex, 1);
        newTabs.splice(index, 0, draggedTab);

        setTabList(newTabs);
        setDraggedIndex(null);
        setDraggedTab(null);
    };

    const handleDragOver = (event, index) => {
        if (pinnedTabs.has(tabList[index].name) || draggedIndex === null) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
    };

    return (
        <div
            className={`tab-container relative overflow-x-clip flex-nowrap flex items-center ${showMore ? 'has-shadow' : ''}`}
            ref={tabContainerRef}
        >
            <div className="tab-box-pinned cursor-pointer">
                <img className="tab-box-pinned-icon" src={IconAlt} loading={"lazy"} alt="pinned-icon" />
            </div>
            {visibleTabs.map((tab, index) => (
                <TabItem
                    key={tab.name || index}
                    name={tab.name}
                    icon={tab.icon}
                    isActive={index === activeIndex}
                    isDragged={index === draggedIndex}
                    isPinned={pinnedTabs.has(tab.name)}
                    onClick={() => handleTabClick(index)}
                    onPinClick={() => handlePinClick(tab.name)}
                    onDragStart={(event) => handleDragStart(index, event)}
                    onDrop={(event) => handleDrop(index, event)}
                    onDragOver={(event) => handleDragOver(event, index)}
                />
            ))}

            {showMore && (
                <div className="tab-more cursor-pointer absolute">
                    <img className={"tab-more-icon"} loading={"lazy"} src={IconMore} alt="more-tabs"/>

                    <div className="tab-more-content overflow-hidden absolute right-full top-full w-max">
                        {hiddenTabs.map((tab, index) => (
                            <div
                                key={tab.name || index}
                                className={`tab-more-content-item relative flex items-center justify-between ${tab.name === tabList[activeIndex].name ? 'active' : ''}`}
                                onClick={() => handleTabClick(tabList.indexOf(tab))}
                            >
                                <div className="tab-more-content-item-content flex items-center">
                                    <img
                                        className="tab-icon"
                                        src={require(`../../images/icons/${tab.icon}.svg`)}
                                        loading="lazy"
                                        alt={IconMore}
                                    />
                                    <span className="tab-name">{tab.name}</span>
                                </div>
                                <img className="tab-more-content-item-close" src={IconDelete} loading={"lazy"} alt="delete-icon"/>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tab;