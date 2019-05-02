import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  signUp: {
    marginTop: '35px'
  }
});


class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pass: '',
      redirect: false,
      errMessage: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { userName, pass } = this.state
    axios.post('/api/auth/login', {userName, pass})
      .then(res => {
          this.setState({
            userName: '',
            pass: '',
            redirect: true,
            errMessage: ''
          }, this.props.setAuthFromLogIn)
          console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        this.setState({errMessage: "Log in credentials are incorrect."})
      })
  }

  logout = () => {
    axios.post('/api/auth/logout')
      .then(res => console.log('logout client', res))
      .catch(err => console.log(err))
  }

  test = () => {
    axios.get('/api/auth/test')
    .then(res => console.log('client api test', res))
    .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props;
    if (this.state.redirect) {
      return <Redirect to="/home"/>
    }

    return (
      // <main className={classes.main}>
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="userName">User Name</InputLabel>
              <Input id="userName" name="userName" value={this.state.userName} onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="pass">Password</InputLabel>
              <Input name="pass" id="pass" value={this.state.pass} onChange={this.handleChange}/>
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>

            <Button type="button" onClick={this.logout} color="secondary">
              run logout 
            </Button>

            <Button type ="button" onClick={this.test} color="secondary">
              run test api 
            </Button>

            <Typography variant="subtitle2" align="center" color="secondary">{this.state.errMessage}</Typography>
          </form>
        
            <Typography className={classes.signUp} variant="subtitle2" align="center">
              <Link to="/landingPage/register"> Need an account? Sign up here! </Link>
            </Typography>
          
        </Paper>
        </div>
      // </main>
    );
  }
}


export default withStyles(styles)(SignIn);