import React from 'react';
import PropTypes from 'prop-types';
import './../../styles/Tabs.scss';

import IconPinned from '../../images/icons/fi-rs-thumbtack.svg';

const TabItem = ({ name, icon, isActive, isDragged, isPinned, onClick, onPinClick, onDragStart, onDrop, onDragOver }) => {
    return (
        <div
            className={`tab cursor-pointer flex relative items-center ${isActive ? 'active' : ''} ${isDragged ? 'dragged-tab' : ''} ${isPinned ? 'pinned' : ''}`}
            onClick={onClick}
            draggable={!isPinned}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <img
                className="tab-icon"
                src={require(`../../images/icons/${icon}.svg`)}
                loading="lazy"
                alt={`${icon} icon`}
            />
            <span className="tab-name">{name}</span>

            <div
                className="tab-box-pinned-hover absolute flex items-center"
                onClick={(e) => {
                    e.stopPropagation();
                    onPinClick();
                }}
            >
                <img
                    className="tab-box-pinned-hover-icon"
                    src={IconPinned}
                    alt="Pinned icon"
                />
                <span className="tab-box-pinned-hover-title">
                    Tab {isPinned ? 'pinnen' : 'anpinnen'}
                </span>
            </div>
        </div>
    );
};

TabItem.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isDragged: PropTypes.bool,
    isPinned: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onPinClick: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
};

export default TabItem;
