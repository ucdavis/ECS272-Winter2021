import {useEffect, useRef} from 'react';
/* code from The Muratorium Youtube tutorials v=bPNkdoEqfVY */

function CheckPreviousState(value){
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default CheckPreviousState;