import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import _ from 'lodash';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableFooter,
  TablePagination
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import Hidden from 'material-ui/Hidden';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import CancelIcon from 'material-ui-icons/Cancel';
import { FormControl } from 'material-ui/Form';
import { LinearProgress } from 'material-ui/Progress';

// import EnhancedTable from '/client/imports/components/EnhancedTable';
import apolloClient from '/client/imports/apollo-client';
import xyzTools from '/both/imports/tools/xyz';
import prettyFormat from '/both/imports/tools/pretty-format';
import styles from './styles';

const columnData = [{
  id: 'name',
  numeric: false,
  disablePadding: false,
  label: 'Name'
}, {
  id: 'empiricalFormula',
  numeric: false,
  disablePadding: true,
  label: 'Empirical Formula'
}, {
  id: 'calculationType',
  numeric: false,
  disablePadding: false,
  label: 'Calculation Type'
}, {
  id: 'calculationMethod',
  numeric: false,
  disablePadding: false,
  label: 'Calculation Method'
}, {
  id: 'basisSet',
  numeric: false,
  disablePadding: false,
  label: 'Basis Set'
}, {
  id: 'created',
  numeric: false,
  disablePadding: false,
  label: 'Created'
}, {
  id: 'status',
  numeric: false,
  disablePadding: false,
  label: 'Status'
}];

class EnhancedTableHead extends React.Component {
  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, searchText } = this.props;

    return (<TableHead>
      <TableRow>
        {
          columnData.map(column => {
            return (<TableCell key={column.id} numeric={column.numeric} padding={column.disablePadding
                ? 'none'
                : 'default'}>
              <Tooltip title="Sort" placement={column.numeric
                  ? 'bottom-end'
                  : 'bottom-start'} enterDelay={300}>
                <TableSortLabel active={(orderBy === column.id) && !(searchText)} direction={order} onClick={this.createSortHandler(column.id)}>
                  {column.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>);
          }, this)
        }
        <TableCell key="other" numeric={false} padding="default">
          <Tooltip title="Other Parameters" placement="bottom-start" enterDelay={300}>
            <TableSortLabel active={false}>
              Other
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>);
  }
}

let callRefetch = (refetch) => {
  // console.log("Refetching...");
  refetch()
}
let throttleRefetch = _.debounce(callRefetch, 1000, { maxWait: 3000 });
class MyCalculationsTableBody extends React.Component {
  state = {}
  subscriptEmpiricalFormula(empiricalFormula) {
    let empiricalFormulaArray = empiricalFormula.split(/(\d+)/);
    return (<div>{
      empiricalFormulaArray.map((value, index) => {
          // Is odd
          if ((index % 2) == 1) {
            return (<sub key={index}>{value}</sub>)
          } else {
            return value
          }
      })
    }</div>)
  }
  componentWillMount() {
    throttleRefetch(this.props.data.refetch);
  }
  render() {
    const { classes, theme } = this.props;
    const { myCalculations, loading, error, refetch } = this.props.data;
    // console.log(myCalculations);
    if (loading && !myCalculations) {
      return <TableBody><TableRow><TableCell colSpan="9001"><LinearProgress /></TableCell></TableRow></TableBody>
    }
    if (error) {
      throw error;
    }
    if (!myCalculations) {
      return <TableBody></TableBody>
    }
    throttleRefetch(refetch);
    const calculationRows = myCalculations.map(calculation => {
      return (<TableRow key={calculation.id} className={classes.tableRow}>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}>
          <Tooltip classes={{tooltip: classes.tooltipInfo}} title={xyzTools.prettyFormat({xyzString: calculation.geometry.atomicCoords, geometryName: calculation.geometry.name})} placement="bottom-start" enterDelay={200}>
            <div className={classes.tableCellInner}>
              {calculation.geometry.name}
            </div>
          </Tooltip>
        </Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{this.subscriptEmpiricalFormula(calculation.geometry.empiricalFormula)}</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{calculation.parameters.type !== "periodicBoundaryCondition" ? prettyFormat(calculation.parameters.type) : prettyFormat(calculation.parameters.periodicType)}</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{prettyFormat(calculation.parameters.method) + (calculation.parameters.method.indexOf("dft") !== -1 ? ` - ${prettyFormat(calculation.parameters.functional)}` : "")}</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{calculation.parameters.method === "machineLearning" ? prettyFormat(calculation.parameters.network) : prettyFormat(calculation.parameters.basisSet)}</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{moment(calculation.createdAt).fromNow()}</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}><div className={classes.tableCellInner}>{
            calculation.error
              ? "Error"
              : calculation.running
                ? "Running"
                : (
                  calculation.completed
                  ? "Completed"
                  : "Queued")
          }</div></Link></TableCell>
        <TableCell className={classes.tableCell}><Link className={classes.tableCellLink} to={`/calculation/${calculation.id}`}>
          <Tooltip classes={{tooltip: classes.tooltipInfo}} title={`Charge: ${calculation.parameters.charge}\n` + `Multiplicity: ${calculation.parameters.multiplicity}`} placement="bottom-start" enterDelay={300}>
            <div className={classes.cellOther}>
              {
                `Charge: ${calculation.parameters.charge}\n` +
                `Multiplicity: ${calculation.parameters.multiplicity} \n`
              }
            </div>
          </Tooltip>
        </Link></TableCell>
      </TableRow>);
    });
    return (<TableBody>
      {calculationRows}
    </TableBody>)
  }
}

const debouncedSearchSetter = _.debounce((value, setterFunction) => {
  setterFunction(value);
}, 300, {maxWait: 1500})

class MyCalculationsTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'created',
    page: 0,
    rowsPerPage: 10,
    searchText: "",
    delayedSearchText: ""
  };
  handleSearchInput = (event) => {
    const searchInput = event.currentTarget.value;
    if (searchInput === "") {
      this.setState({ delayedSearchText: searchInput });
    } else {
      debouncedSearchSetter(searchInput, () => {
        this.setState({ delayedSearchText: searchInput });
      })
    }
    this.setState({ searchText: searchInput });
  };
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  componentWillMount() {
    this.props.data.refetch();
  };
  render() {
    const { classes, theme } = this.props;
    const { order, orderBy, rowsPerPage, page, searchText, delayedSearchText } = this.state;
    let { loading, error, myCalculationCount } = this.props.data;
    let calculationCount = myCalculationCount ?
      myCalculationCount :
      0;
    if (error) {
      throw error;
    }
    return (<Paper className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgDown={true} implementation="css">
          <Typography type="title" className={classes.title}>My Calculations</Typography>
        </Hidden>
        <div className={classes.spacer}/>
        <FormControl className={classes.searchContainer}>
          <Input id="search" disableUnderline={true} className={classes.searchInput} type={'text'} value={searchText} onChange={this.handleSearchInput} startAdornment={<InputAdornment className = {
              classes.searchAdornment
            }
            position = "start" > <SearchIcon/>
          </InputAdornment>} endAdornment={searchText !== ""
              ? (<InputAdornment className={classes.cancelSearchAdornment} position="end" onClick={() => {
                  this.handleSearchInput({currentTarget: {value: ""}})
                }}><CancelIcon/></InputAdornment>)
              : null}/>
        </FormControl>
      </Toolbar>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <EnhancedTableHead order={order} orderBy={orderBy} searchText={searchText} onRequestSort={this.handleRequestSort}/>
          <MyCalculationsTableBodyWithData sortOrder={order === 'desc'
              ? 1
              : -1} sortBy={orderBy} limit={rowsPerPage} skip={rowsPerPage * page} page={page} search={delayedSearchText} classes={classes} theme={theme}/>
          <TableFooter>
            <TableRow>
              <TablePagination count={calculationCount} rowsPerPage={rowsPerPage} page={page} onChangePage={this.handleChangePage} onChangeRowsPerPage={this.handleChangeRowsPerPage} rowsPerPageOptions={[10, 25, 40]}/>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>)
  }
}

class MyCalculationsPage extends React.Component {
  state = {};

  render() {
    const { classes, theme } = this.props;
    return (<div className={classes.container}><MyCalculationsTableWithData classes={classes} theme={theme}/></div>);
  }
}

MyCalculationsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const MyCalculationsQuery = gql `
  query MyCalculations($limit: Int!, $skip: Int!, $sortBy: String!, $sortOrder: Int!, $search: String) {
    myCalculations(limit: $limit, skip: $skip, sortBy: $sortBy, sortOrder: $sortOrder, search: $search) {
      id
      geometry {
        empiricalFormula
        name
        atomicCoords
      }
      parameters {
        type
        periodicType
        method
        network
        basisSet
        charge
        functional
        multiplicity
        pseudoPotential
        densityFit
        auxBasisSet
        latticeVectors
        kPoints
      }
      running
      completed
      createdAt
      error
    }
  }
`;
const calculationWatcher = apolloClient.watchQuery({
  query: MyCalculationsQuery,
  fetchPolicy: "network-only",
  variables: {
    limit: 10,
    skip: 0,
    sortBy: "created",
    sortOrder: 1,
    search: "",
  },
});
const MyCalculationsTableBodyWithData = withRouter(graphql(MyCalculationsQuery, {
  options: ({ limit, skip, sortBy, sortOrder, search }) => ({
    variables: {
      limit,
      skip,
      sortBy,
      sortOrder,
      search
    },
    pollInterval: 60000
  })
})(MyCalculationsTableBody));

const MyCalculationCountQuery = gql `
  query MyCalculationCount {
    myCalculationCount
  }
`;
const calculationCountWatcher = apolloClient.watchQuery({
  query: MyCalculationCountQuery,
  fetchPolicy: "network-only"
});
const MyCalculationsTableWithData = graphql(MyCalculationCountQuery)(MyCalculationsTable);

let loginTracker;
Meteor.startup(() => {
  loginTracker = Tracker.autorun(() => {
    if (Meteor.userId()) {
      calculationWatcher.startPolling(5000);
      calculationCountWatcher.startPolling(5000);
    } else {
      calculationWatcher.stopPolling();
      calculationCountWatcher.stopPolling();
    }
  });
})

export default withStyles(styles, { withTheme: true })(MyCalculationsPage);
