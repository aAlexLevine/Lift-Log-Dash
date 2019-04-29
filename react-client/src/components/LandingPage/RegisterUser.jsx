import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
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

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      pass: '',
      email: ''
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(e.target.value)
  }

  handleSubmit = () => {
    const { userName, pass, email } = this.state
    const userInfo = {userName, pass, email}
    console.log('handleSubmit')
    axios.post('/api/auth/register', userInfo)
      .then(res => {
        this.setState({
          userName: '',
          pass: '',
          email: ''
        })
        //redirect
        console.log(res.data)
      })

    
  }

  render() {
    const { classes } = this.props;

    return (
      // <main className={classes.main}>
      <div className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Register an Account
          </Typography>

          <form className={classes.form} autoComplete="off">
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Name</InputLabel>
              <Input id="userName" name="userName" value={this.state.userName} onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="pass" id="pass" value={this.state.pass} onChange={this.handleChange}/>
            </FormControl>
            <Button
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}

            >
              Register
            </Button>
          </form>
        
            <Typography className={classes.signUp} variant="subtitle2" align="center">
              <Link to="/landingPage/signIn"> Have an account? Log in here! </Link>
            </Typography>
        </Paper>
      </div>
      // </main>
    );
  }
}

export default withStyles(styles)(RegisterUser);