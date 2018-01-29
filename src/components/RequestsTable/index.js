import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import { getPhone } from 'utils/functions';
import DetailsForm from 'components/DetailsForm';
import config from '402Config';
import InlineEdit from 'react-edit-inline';
import _ from 'lodash';


// import './RequestsTable.scss';


class RequestsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateModalOpen: false,
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.updateRequest = this.updateRequest.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
    this.rendercol = this.rendercol.bind(this);
    this.currentId = null;

  }
  renderColumn(newVal, oldVal, key, id) {
    if (newVal) newVal = newVal.toString();
    if (oldVal) oldVal = oldVal.toString();
    if (newVal === oldVal) {
      if (key === 'listing_type_1') return <TableRowColumn>{config.searchTabs[oldVal]}</TableRowColumn>;
      else if (key === 'categories') 
             return <TableRowColumn>{oldVal}</TableRowColumn>;
      return <TableRowColumn>    
        <InlineEdit
                activeClassName="editing"
                text={ oldVal || ''}
                paramName={key}
                change={(e)=>{this.currentId = id;this.dataChanged(e)}}
                style={{
                  backgroundColor: '#e7e7b8',
                  minWidth: 150,
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  fontSize: 15,
                  outline: 0,
                  border: 0
                }}
              />
              </TableRowColumn>;
    }
    if (key === 'listing_type_1') 
    return <TableRowColumn><div className="new-val">{config.searchTabs[newVal]}</div><div>{config.searchTabs[oldVal]}</div></TableRowColumn>;
    else if (key === 'categories') 
    return <TableRowColumn><div className="new-val">{newVal}</div><div>{oldVal}</div></TableRowColumn>;
    return <TableRowColumn>
      <div className="new-val">
      {key ?
      <InlineEdit
      activeClassName="editing"
      text={ newVal || ''}
      paramName={key}
      change={(e)=>{this.currentId = id;this.dataChanged(e)}}
      style={{
        backgroundColor: '#e7e7b8',
        minWidth: 150,
        display: 'inline-block',
        margin: 0,
        padding: 0,
        fontSize: 15,
        outline: 0,
        border: 0
      }}
    />:''} </div>
      <div>
        <abbr title={oldVal}>{oldVal}</abbr>
      </div>
    </TableRowColumn>;
  }

  rendercol(val, key ,id){
    return <TableRowColumn><InlineEdit
    activeClassName="editing"
    text={ val || ''}
    paramName={key}
    change={(e)=>{this.currentId = id;this.dataChanged(e)}}
    style={{
      backgroundColor: '#e7e7b8',
      minWidth: 150,
      display: 'inline-block',
      margin: 0,
      padding: 0,
      fontSize: 15,
      outline: 0,
      border: 0
    }}
  /></TableRowColumn>
  }

  dataChanged(data) {
    var record;
    if (this.currentId) {
      this.props.data.forEach(e => {
      if(e._id == this.currentId) {
        record = e;
        return;
      }
    });
      if (record)  {
          if (Object.keys(data) == 'first_name') {
            var name = Object.values(data)[0];
            name = name.split(' ');
            record.data['first_name'] = name[0];
            record.data['last_name'] = name[1];
            if (name[2])
              record.data['last_name']+= ' '+name[2];
            if (name[3])
              record.data['last_name']+= ' '+name[3];
      }
      else record.data[Object.keys(data)] = Object.values(data);
      record.data._id = this.currentId;
      this.props.updateRequest(record.data, record.data.categories);  
      }
    }
  }

  handleModalClose() {
    this.setState({ updateModalOpen: false });
    this.props.cleanSelectedRecordData();
  }

  updateRequest(values, categories) {
    this.handleModalClose();
    this.props.updateRequest(values, categories);
  }


  render () {
    return (
      <div className="table">
        <br />
        <h4>נמצאו {this.props.data.length} תוצאות</h4>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>שם המעדכן</TableHeaderColumn>
              <TableHeaderColumn>שם העסק \ איש קשר</TableHeaderColumn>
              <TableHeaderColumn>סוג</TableHeaderColumn>
              <TableHeaderColumn>רחוב</TableHeaderColumn>
              <TableHeaderColumn>מספר בית</TableHeaderColumn>
              <TableHeaderColumn>עיר</TableHeaderColumn>
              <TableHeaderColumn>טל</TableHeaderColumn>
              <TableHeaderColumn>נייד</TableHeaderColumn>
              <TableHeaderColumn>קטגוריות</TableHeaderColumn>
              <TableHeaderColumn>ר. לא רלוונטית</TableHeaderColumn>
              <TableHeaderColumn>סיבה</TableHeaderColumn>
              <TableHeaderColumn>תאריך עדכון</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.data.map((res, key) =>
              res.record ?
                <TableRow key={key}>
                  <TableRowColumn><div>{res.sender.fname} {res.sender.lname}</div><div>{res.sender.email}</div></TableRowColumn>   
                  {res.data.business_name ?
                  this.renderColumn(res.data.business_name, res.record.business_name,'business_name',res._id) :
                  this.renderColumn(`${res.data.first_name} ${res.data.last_name}`, `${res.record.first_name} ${res.record.last_name}`,'first_name',res._id) }
                  {this.renderColumn(res.data.listing_type_1, res.record.listing_type_1, 'listing_type_1',res._id)}
                  {this.renderColumn(res.data.address_street_name, res.record.address_street_name ,'address_street_name',res._id)}
                  {this.renderColumn(res.data.address_street_number, res.record.address_street_number ,'address_street_number',res._id)}
                  {this.renderColumn(res.data.address_city, res.record.address_city ,'address_city',res._id)}
                  {this.renderColumn(getPhone(res.data.phone).toString(), getPhone(res.record.phone).toString(),'phone',res._id)}
                  {this.renderColumn(getPhone(res.data.phone_2).toString(), getPhone(res.record.phone_2).toString(),'phone_2',res._id)}
                  {this.renderColumn(res.data.categories, res.record.categories,'categories',res._id)}
                  {this.renderColumn(res.data.is_deleted_checked, res.record.is_deleted_checked, 'is_deleted_checked',res._id)}
                  {this.renderColumn(res.data.reason_not_relevant, res.record.reason_not_relevant,'reason_not_relevant',res._id)}
                  {this.renderColumn(res.data.updated, res.record.updated,'updated',res._id)}
                  <TableRowColumn>
                    <div onClick={() => this.props.approveRequest(res._id)}><RaisedButton label="אישור" /></div>
                    <div onClick={() => { this.setState({ updateModalOpen: true, selectedRow: res }); }}><RaisedButton label="עדכון" /></div>
                    <div onClick={() => this.props.deleteRequest(res._id)}><RaisedButton label="מחיקה" /></div>
                  </TableRowColumn>
                </TableRow>
              :
                <TableRow key={key} className="new-record">
                  <TableRowColumn onChange={this.change}><div>{res.sender.fname} {res.sender.lname}</div><div>{res.sender.email}</div></TableRowColumn>
                  {res.data.business_name ?
                    this.rendercol(res.data.business_name,'business_name',res._id) :
                    this.rendercol(`${res.data.first_name} ${res.data.last_name}`,'first_name',res._id)
                    }
                  <TableRowColumn>{config.searchTabs[res.data.listing_type_1]}</TableRowColumn>
                  {this.rendercol(res.data.address_street_name,'address_street_name',res._id)}
                  {this.rendercol(res.data.address_street_number,'address_street_number',res._id)}
                  {this.rendercol(res.data.address_city,'address_city',res._id)}
                  {this.rendercol(getPhone(res.data.phone).toString(),'phone',res._id)}
                  {this.rendercol(getPhone(res.data.phone_2).toString(),'phone_2',res._id)}
                 <TableRowColumn><abbr title={res.data.categories}>{res.data.categories}</abbr></TableRowColumn>
                  <TableRowColumn>{res.data.is_deleted_checked}</TableRowColumn>
                  <TableRowColumn>{res.data.reason_not_relevant}</TableRowColumn>
                  <TableRowColumn>{res.data.updated}</TableRowColumn>
                  <TableRowColumn>
                    <div onClick={() => this.props.approveRequest(res._id)}><RaisedButton label="אישור" /></div>
                    <div onClick={() => { this.setState({ updateModalOpen: true, selectedRow: res }); }}><RaisedButton label="עדכון" /></div>
                    <div onClick={() => this.props.deleteRequest(res._id)}><RaisedButton label="מחיקה" /></div>
                  </TableRowColumn>
                </TableRow>
            )}
      
          </TableBody>
        </Table>
        {this.state.updateModalOpen && this.state.selectedRow ?
          <DetailsForm
            open={this.state.updateModalOpen}
            handleClose={this.handleModalClose}
            onSubmit={/* this.props.updateRequest*/this.updateRequest}
            id={this.state.selectedRow._id}
            type={this.state.selectedRow.data.listing_type_1}
            adminUpdate
          /> : ''}
      </div>
    );
  }
}

RequestsTable.propTypes = {
  data: React.PropTypes.array,
  approveRequest: React.PropTypes.func,
  deleteRequest: React.PropTypes.func,
  cleanSelectedRecordData: React.PropTypes.func,
  updateRequest: React.PropTypes.func,
};


export default RequestsTable;
