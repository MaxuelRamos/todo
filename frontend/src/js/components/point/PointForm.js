import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Camera from 'react-html5-camera-photo';
import GoogleMapReact from 'google-map-react';
import registerPoint from '../../operators/pointsOperator';

import 'react-html5-camera-photo/build/css/index.css';

const K_WIDTH = 25;
const K_HEIGHT = 25;
const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_WIDTH,
  height: K_HEIGHT,
  left: -K_WIDTH / 2,
  top: -K_HEIGHT / 2,

  border: '8px solid #000000',
  borderRadius: K_HEIGHT,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
};
function MyGreatPlace() {
  return <div style={greatPlaceStyle} />;
}

class CompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      point: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadPosition();
  }

  loadPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.onPositionLoad);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  onPositionLoad = (position) => {
    const { point } = this.state;
    this.setState({
      point: {
        lat: position.coords.latitude,
        long: position.coords.longitude,
        ...point,
      },
    });

    console.log(this.state);
  };

  handleChange = (e) => {
    const { point } = this.state;
    point[e.target.name] = e.target.value;
    this.setState({ point });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { point } = this.state;
    const { registerPoint } = this.props;

    registerPoint(point);
  };

  resetPhoto = () => {
    const { point } = this.state;
    point.dataUri = undefined;
    this.setState({ point });
  };

  onTakePhoto = (dataUri) => {
    // Do stuff with the dataUri photo...
    const { point } = this.state;
    console.log(dataUri.length);
    point.dataUri = dataUri;
    this.setState({ point });
  };

  render() {
    const { loading, errorMessage } = this.props;
    const { point } = this.state;

    const center = [point.lat, point.long];
    return (
      <div>
        {loading && <CircularProgress />}

        <form onSubmit={this.handleSubmit}>
          {!point.dataUri && (
            <Camera
              isFullscreen
              imageCompression={0.1}
              isMaxResolution={false}
              sizeFactor={0.2}
              onTakePhoto={(dataUri) => {
                this.onTakePhoto(dataUri);
              }}
            />
          )}

          {point.dataUri && (
            <div>
              <img src={point.dataUri} alt="Foto" />
              <Button
                variant="contained"
                type="button"
                disabled={loading}
                onClick={this.resetPhoto}
              >
                {'Tirar outra'}
              </Button>

              {point.lat && (
                <div style={{ height: 200, width: 200 }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: 'AIzaSyBHOri2pRdI5cwDTgC8n2tFWms90Ddxgyg',
                    }}
                    center={center}
                    defaultZoom={15}
                  >
                    <MyGreatPlace
                      lat={point.lat}
                      lng={point.long}
                      text="A" /* Kreyser Avrora */
                    />
                  </GoogleMapReact>
                </div>
              )}
            </div>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={loading || !point.dataUri || !point.lat}
          >
            {'Salvar'}
          </Button>
          <br />
          {errorMessage}
        </form>
      </div>
    );
  }
}

CompanyForm.propTypes = {
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  registerPoint: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  loading: state.points.loading,
  errorMessage: state.points.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerPoint,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyForm);
