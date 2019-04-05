import React, { Component } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { map } from 'lodash';
import classNames from 'classnames';

import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { setMaps } from '../../store/actions/mapsActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  maps: {
    height: theme.spacing.unit * 40,
  },
  roads: {
    height: theme.spacing.unit * 60,
  }
});

const googleMaps = window.google.maps;
const directionsDisplay = new googleMaps.DirectionsRenderer({suppressMarkers: true});
const service = new googleMaps.DistanceMatrixService();

export class LiveMap extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       maps: null,
    }
  }
  
  initMap(comp, opt) {
    const maps = new googleMaps.Map(comp, {...opt});
    this.props.setMaps(maps);
  }

  componentDidMount() {
    this.initMap(document.getElementById('maps'), this.props.options);
  }

  componentDidUpdate({ markers: prevMarkers, directions: prevDirections }) {
    const { directions, maps, markers, options } = this.props;

    if(!this.state.maps) {
      maps.setCenter(options.center);
    }

    map(prevMarkers, marker => marker.setMap(null)); 
    map(markers, marker => marker.setMap(maps));

    if(directions && (prevDirections !== directions)) {

      if(!this.state.maps) {
        directionsDisplay.setMap(maps);
        this.setState({ maps });
      }

      service.getDistanceMatrix(
        {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: googleMaps.TravelMode.DRIVING,
          transitOptions: TransitOptions,
          drivingOptions: DrivingOptions,
          unitSystem: UnitSystem,
          avoidHighways: Boolean,
          avoidTolls: Boolean,
        }, 
        res => {

        },
        err => {

        }
      );

      if(false) {//TASK: Rules to say if they are in the same place (CHEGOU)
        
      } else {
        directionsDisplay.setDirections(directions);
      }
    }
  }

  render() {
    const { classes, title, roads } = this.props;

    return (
      <Paper className={classes.paper}>
        <h5>{title}</h5>
        <hr/>
        <div 
          className={classNames(classes.maps, roads && classes.roads)}
          id='maps'
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => {
  return {
    maps: state.maps.maps,
    directions: state.maps.directions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMaps: maps => dispatch(setMaps(maps)),
  }
}

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LiveMap);


