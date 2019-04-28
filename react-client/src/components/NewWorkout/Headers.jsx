import React from 'react';
import TableCell from '@material-ui/core/TableCell';

const Headers = (props) => (
      <React.Fragment>
        <TableCell>
          Set {props.idx + 1}
        </TableCell>
        {props.idx + 1 < props.numOfHeaders ? <TableCell>Rest</TableCell> : null }
      </React.Fragment>      
)   

export default Headers;
