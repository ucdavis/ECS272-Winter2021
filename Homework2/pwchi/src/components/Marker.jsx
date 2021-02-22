// from https://github.com/google-map-react/google-map-react/blob/master/example/src/components/Marker.js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 18px;
    border: 2px solid #fff;
    border-radius: 100%;
    user-select: none;
    transform: translate(-50%, -50%);
    cursor: ${(props) => (props.onClick ? "pointer" : "default")};
    &:hover {
        z-index: 1;
    }
`;

const Marker = ({ text, color, onClick }) => (
    <Wrapper alt={text} onClick={onClick} style={{ backgroundColor: color }} />
);

Marker.defaultProps = {
    onClick: null,
};

Marker.propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default Marker;
