import {useEffect, useState} from "react";

/* code adapted from "The Muratorium" d3 react Youtube tutorials v=a4rstx9Pz2o */
//custom react hook
const useResizeObserver = (ref) => { //take reference to element
    const [dimensions, setDimensions] = useState(null);
    useEffect(() => { //need to use useEffect hook to access dom element inside the reference once all dom elements have been rendered
        const observeTarget = ref.current; //what I want to observer. current property is dom element that lives inside the reference
        const resizeObserver = new ResizeObserver((entries) => { //callback receives entries we are observer that are resizing
            //console.log(entries); // check what entries array holds
            entries.forEach(entry => { //for each element in entry array
                setDimensions(entry.contentRect); //set dimension of the content rect size
            })
        });
        resizeObserver.observe(observeTarget); //observe the observerTarget
        return() => {
            resizeObserver.unobserve(observeTarget); //what to return when gets removed/unmounted
        }
    }, [ref]); // dependency array
    return dimensions;
};

export default useResizeObserver