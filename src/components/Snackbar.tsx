import React from 'react';
import Snack from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
interface Props {}

function Snackbar(props: Props) {
  const {} = props;

  return <Snack anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
     <Alert severity="error">This is an error message!</Alert>
  </Snack>;
}

export default Snackbar;
