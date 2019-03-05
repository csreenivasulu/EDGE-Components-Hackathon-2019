import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingPanel() {
    return (
        <div className="loading-panel">
            <div><CircularProgress /></div>
            <div>Loading</div>
        </div>
    )
}

export default LoadingPanel;