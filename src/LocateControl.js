import L from 'leaflet'
import {MapControl, withLeaflet} from 'react-leaflet'

import './locate.css'

// Converts leaflet.locatecontrol to a React Component
class LocateControlImpl extends MapControl {
    createLeafletElement(props) {
        const {options, startDirectly} = props;
        const {map} = props.leaflet;
        const lc = L.control.locate(options).addTo(map);

        if (startDirectly)
            setTimeout(() => {
                lc.start()
            }, 0);
        return lc;
    }
}
const LocateControl = withLeaflet(LocateControlImpl);

import PropTypes from 'prop-types'

LocateControl.propTypes = {
  options: PropTypes.object, // Locate Options
  startDirectly: PropTypes.bool // Instantly start the locate control
}
