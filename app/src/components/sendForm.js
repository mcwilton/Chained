import React from 'react'
import {withStyles} from 'material-ui/styles'
import SaveIcon from 'material-ui-icons/Save'
import {UPDATE_NEW_TXS_FORM, SUBMIT_NEW_TXS} from '../constants'
import {createTxs, isActive} from '../action-creators/txs'
import {connect} from 'react-redux'
import {transactionForm} from '../reducers/txs/searchTxs';
import {prop, path, compose, split, last} from 'ramda'
import {Link} from 'react-router-dom'
import {
  AppBar,
  List,
  TextField,
  FormControl,
  InputLabel,
  Typography,
  Select,
  Toolbar,
  Button,
  IconButton,
  Icon,
  Snackbar
} from 'material-ui'

const styles = theme => ({
  input: {
    width: '50%',
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 8
  }
})

class SendForm extends React.Component {

  componentDidMount() {
    const pathID = prop('match')(this.props)
      ? path(['match', 'params', 'id'])(this.props)
      : compose(last, split('/'), path(['location', 'pathname']))(this.props)

    this
      .props
      .onChange('recipient', pathID)

  }
  // add appBar with the ability to cancel txs
  render() {
    console.log('in SendForm')
    console.log("this.props.activeUser.id")
    const {classes} = this.props
    return (
      <div>
      <AppBar position="static">
      <Toolbar className="flex" color="contrast">
        <Link to={`/search/${this.props.activeUser.id}`} style={{ textDecoration: 'none', color: 'transparent' }}>
          <IconButton color="inherit">
            <Icon color="accent" style={{ fontSize: 36 }}>
              keyboard_arrow_left
            </Icon>
          </IconButton>
        </Link>
        <Typography color="inherit" className="flex-auto" type="title">
          New Widget Form
        </Typography>
        <Button type="submit" color="inherit">
          Save
        </Button>
      </Toolbar>
    </AppBar>
      <form
        style={{
        marginTop: 8
      }}
        autoComplete="off"
        onSubmit={this.props.createTxs}>
        <TextField
          label="Recipient"
          value={this.props.transactionForm.recipient}
          margin="normal"
          required
          className={classes.input}/>
        <TextField
          label="Amount"
          value={this.props.transactionForm.amount}
          onChange={e => {
          this
            .props
            .onChange('amount', e.target.value)
        }}
          margin="normal"
          required
          className={classes.input}
          multiline/>
        <TextField
          label="Description"
          value={this.props.transactionForm.description}
          onChange={e => {
          this
            .props
            .onChange('description', e.target.value)
        }}
          margin="normal"
          required
          className={classes.input}
          multiline/>

        <Button
          fab
          color="primary"
          type="submit"
          aria-label="add"
          className="fab-button"
          disabled={false}>
          <SaveIcon/>
        </Button>
      </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {transactionForm: state.transactionForm, activeUser: state.activeUser}
}

const mapActionsToProps = dispatch => {
  return {

    createTxs: e => {
      e.preventDefault()
      dispatch(createTxs)
    },
    onChange: (field, value) => {
      dispatch({
        type: UPDATE_NEW_TXS_FORM,
        payload: {
          [field]: value
        }
      })
      dispatch(isActive)
    },
    isActive: () => dispatch({})
  }
}
const connector = connect(mapStateToProps, mapActionsToProps)

export default withStyles(styles)(connector(SendForm))