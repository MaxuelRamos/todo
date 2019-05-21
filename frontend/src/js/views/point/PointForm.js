import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Camera from 'react-html5-camera-photo';
import GoogleMapReact from 'google-map-react';
import Grid from '@material-ui/core/Grid';
import 'react-html5-camera-photo/build/css/index.css';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { push } from 'react-router-redux';
import Fab from '@material-ui/core/Fab';
import ReplayPoint from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';
import registerPoint from '../../operators/pointsOperator';
import Alert from '../../components/Alert';

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

  onCancelPhoto = () => {
    const { push } = this.props;
    push('/me');
  };

  render() {
    const { loading, errorMessage } = this.props;
    const { point } = this.state;

    // const center = [point.lat, point.long];

    console.log('aaaaaaa', point.lat);
    return (
      <React.Fragment>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Alert text={errorMessage} type="danger" />
          </Grid>

          {loading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}

          {!point.dataUri && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9000,
                backgroundColor: 'black',
                overflow: 'hidden',
                backgroundSize: 'cover',
              }}
            >
              <IconButton
                aria-label="Add"
                disabled={loading}
                onClick={this.onCancelPhoto}
                style={{
                  zIndex: 9001,
                  position: 'fixed',
                }}
              >
                <CloseIcon
                  style={{
                    color: 'white',
                    fontSize: 40,
                  }}
                />
              </IconButton>
              <Camera
                style={{ height: '100vh' }}
                idealResolution={{ width: 75, height: 100 }}
                onTakePhoto={(dataUri) => {
                  this.onTakePhoto(dataUri);
                }}
              />
            </div>
          )}

          {point.dataUri && (
            <Grid item xs={12}>
              <img
                src={point.dataUri}
                alt="Foto"
                style={{
                  width: '60%',
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  maxHeight: 400,
                  maxWidth: 300,
                }}
              />
            </Grid>
          )}
        </Grid>

        {point.dataUri && (
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={8}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                onClick={this.resetPhoto}
              >
                {'Tirar outra foto'}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disabled={loading || !point.lat}
                onClick={this.handleSubmit}
              >
                {'Salvar'}
              </Button>
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );
  }
}

CompanyForm.propTypes = {
  params: PropTypes.shape({}).isRequired,
  loading: PropTypes.bool.isRequired,
  registerPoint: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  push: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.points.loading,
  errorMessage: state.points.errorMessage,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    registerPoint,
    push,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompanyForm);

{
  /* {point.lat && (
                    <Grid item xs={12}>
                      <div
                        style={{
                          height: 200,
                          width: 200,
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      >
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
                            text="A"
                          />
                        </GoogleMapReact>
                      </div>
                    </Grid>
                  )} */
}
