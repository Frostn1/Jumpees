import PropTypes from 'prop-types';
import './TogglePaths.scss'
import {useEffect, useState} from "react";
const TogglePaths = (props) => {
    const [isOn, setIsOn] = useState(props.isOn)
    const root = document.documentElement;
    root.style.setProperty(
        '--toggle-off-color',
        props.offColor
    )
    root.style.setProperty(
        '--toggle-on-color',
        props.onColor
    )
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty(
            '--toggle-off-color',
            props.offColor
        )
        root.style.setProperty(
            '--toggle-on-color',
            props.onColor
        )
    }, [props.offColor, props.onColor])
    const toggleState = (state) => {
        setIsOn(state)
        props.toggleState(state)
        const sliderToy = document.getElementById('slider-toy');

        if(state) {
            sliderToy.style.animationName = 'off-to-on';
            sliderToy.style.animationDuration = '1s';
            sliderToy.style.left = 'calc(100% - 45px - 5px)';
            sliderToy.style.background = props.onColor;
        } else {
            sliderToy.style.animationName = 'on-to-off';
            sliderToy.style.animationDuration = '1s';
            sliderToy.style.left = '5px';
            sliderToy.style.background = props.offColor;
        }

    }
    return (
        <div id='toggle-paths'>
            <div className={'slider-path'}>
                <div className={'slider'} id={'slider-toy'} onClick={() => toggleState(!props.isOn)}/>
            </div>
        </div>
    )
};

TogglePaths.propTypes = {
    isOn: PropTypes.bool.isRequired,
    toggleState: PropTypes.func.isRequired,
    onColor: PropTypes.string.isRequired,
    offColor: PropTypes.string.isRequired
};

export default TogglePaths
