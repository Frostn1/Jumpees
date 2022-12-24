import PropTypes from 'prop-types';
import './TogglePaths.scss'
import {useState} from "react";
const TogglePaths = (props) => {
    const [isOn, setIsOn] = useState(props.isOn)
    const offColor = '#984447';
    const onColor = '#B4DC7F';
    const root = document.documentElement;
    root.style.setProperty(
        '--toggle-off-color',
        offColor
    )
    root.style.setProperty(
        '--toggle-on-color',
        onColor
    )
    const toggleState = (state) => {
        setIsOn(state)
        props.toggleState(state)
        const sliderToy = document.getElementById('slider-toy');

        if(state) {
            sliderToy.style.animationName = 'off-to-on';
            sliderToy.style.animationDuration = '1s';
            sliderToy.style.left = 'calc(100% - 45px - 10px)';
            sliderToy.style.background = onColor;
        } else {
            sliderToy.style.animationName = 'on-to-off';
            sliderToy.style.animationDuration = '1s';
            sliderToy.style.left = '10px';
            sliderToy.style.background = offColor;
        }

    }
    return (
        <div id='toggle-paths'>
            <div className={'slider-path'}>
                <div className={'slider'} id={'slider-toy'} onClick={() => toggleState(!props.isOn)}>

                </div>
            </div>
        </div>
    )
};

TogglePaths.propTypes = {
    isOn: PropTypes.bool.isRequired,
    toggleState: PropTypes.func.isRequired
};

export default TogglePaths
