import React from "react";

const Test = (props) => {
    console.log(props);
    return <div>{props.children}</div>;
};

export default Test;
