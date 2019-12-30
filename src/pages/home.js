import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

// My components
import Scream from '../components/Scream'

export class home extends Component {
  state = {
    screams: null
  };
  componentDidMount() {
    axios
      .get('/screams')
      .then(res => {
        // FIXME
        console.log(res.data)
        this.setState({
          screams: res.data
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map(scream => <Scream scream={scream}/>)
    ) : <p>Loading . . .</p>
    return (
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={6} xs={12}>
          <p>Content....</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
