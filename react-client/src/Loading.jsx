import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const center = {  
  margin: "0",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:'50%'
}

function Loading(props) {
    return (
      <div style={center}>
         <Typography variant="h5" component="h3" align="center">
          Loading...
        </Typography>
        <LinearProgress />
      </div>
  );
}



export default Loading;