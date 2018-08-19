import React from 'react';

import './PaperHeader.css';

const paperHeader = props => (
    <div className="ph-main">
        <p className="ph-primary">
            {props.primary}
        </p>
        <p className="ph-secondary">
            {props.secondary} 
        </p>
    </div>
)

export default paperHeader;