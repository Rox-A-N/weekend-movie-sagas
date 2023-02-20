import React from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function SubmitButton() {
    const history = useHistory();

    const routeToList = () => {
        history.push('/');
    }

    return (
        <Button onClick={routeToList} variant='contained' color='primary'>
            Return to List
        </Button>
    )

}

export default SubmitButton;