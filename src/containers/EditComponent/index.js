import React from 'react';
import {loadRecords, recordsLoaded} from './actions';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Autocomplete from 'components/Autocomplete';


export class EditComponent extends React.PureComponent {
	
  constructor(props) {
	super(props);
	this.handleCategoriesRequest = this.handleCategoriesRequest.bind(this);
	this.handleChange = this.handleChange.bind(this);
    this.state = { 
			objects: [
		{type: "text", x: 10, y: 20, text: "Hello!", fill: "red"},
		{type: "rect", x: 50, y: 70, fill: "red"}
		],
		records:["fafdafa","fadsfa"]
  };
  this.props.loadRecords();   
console.log('this.props.records',this.props.records);
  }
  componentDidMount(){
	require('./style.css');
    require ('./image.js');
    require ('./request.js');
  }
  handleChange(selectorFiles)
  {
      console.log('selectorFilesss ',selectorFiles);
  }
OnLoadGetRecords(){
	console.log('OnLoadGetRecords');
	//let recordsList= getRecords();
}
handleCategoriesRequest(searchText, index, tabType) {
    if (index !== -1) this.props.loadSubCategories(searchText, tabType, false);
    this.props.onNewRequest();
  }

  render() {
	  console.log('this.props.data.records',this.props.data.records);
    return (
      <div>
<div id="wrapper" className="editLandscape">
	<header id="header">
		<nav id="nav" className="clearfix">
			<ul>
				<li id="save"><a href="#">save</a></li>
				{/* <li id="load"><a href="#" onClick={this.OnLoadGetRecords}>load</a></li> */}
				<li id="load"><a href="#">load</a></li>
				<li id="from_html"><a href="#">from html</a></li>
				<li id="rect"><a href="#">rectangle</a></li>
				<li id="circle"><a href="#">circle</a></li>
				<li id="polygon"><a href="#">polygon</a></li>
				<li id="edit"><a href="#">edit</a></li>
				<li id="to_html"><a href="#">to html</a></li>
				<li id="preview"><a href="#">preview</a></li>
				<li id="clear"><a href="#">clear</a></li>
				<li id="new_image"><a href="#">new image</a></li>
				<li id="show_help"><a href="#">?</a></li>
			</ul>
		</nav>
		<div id="coords"></div>
		<div id="debug"></div>
	</header>	
	<div id="image_wrapper">
		<div id="image">
			<img src="" alt="#" id="img" />
			<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" id="svg"></svg>
		</div>
	</div>
</div>

<div id="code">
	<span className="close_button" title="close"></span>
	<div id="code_content"></div>
</div>

<form id="edit_details">
	<h5>Startup info</h5>
	<span className="close_button" title="close"></span>
	<p>
		<label htmlFor="href_attr">href</label>
		<input type="text" id="href_attr" />
	</p>
	{/* <p>
		<label htmlFor="alt_attr">alt</label>
		<input type="text" id="alt_attr" />
	</p> */}
	 
	 <label htmlFor="startup_name_attr">Name</label>

	<Autocomplete 
                  text="Type startup name"
                  hintText="Startup name"
                  dataSource={this.props.data.records || []}
                //   handleUpdateInput={(searchText) => this.props.handleInput(searchText, 'startupname')}
                  onNewRequest={(chosenRequest, index) => { this.props.emptySubCategories(index); this.handleCategoriesRequest(chosenRequest, index, 'businesses')}}
                /> 
	{/* <p>
		<label htmlFor="startup_name_attr">Name</label>
		<select id="startup_name_attr" form="edit_details">
		<option value="volvo">Volvo</option>
		<option value="saab">Saab</option>
		<option value="opel">Opel</option>
		<option value="audi">Audi</option>
		</select>
	</p> */}
	<button id="save_details">Save</button>
</form>

<div id="from_html_wrapper">
	<form id="from_html_form">
		<h5>Loading areas</h5>
		<span className="close_button" title="close"></span>
		<p>
			<label htmlFor="code_input">Enter your html code:</label>
			<textarea id="code_input"></textarea>
		</p>
		<button id="load_code_button">Load</button>
	</form>
</div>
  
<div id="get_image_wrapper">
	<div id="get_image">
		<div id="loading">Loading</div>
		<div id="file_reader_support">
			<label>Drag an image</label>
			<div id="dropzone">
				<span className="clear_button" title="clear">x</span> 
				<img src="" alt="preview" id="sm_img" />
			</div>
			<b>or</b>
		</div>
		<label htmlFor="url">type a url</label>
		<span id="url_wrapper">
			<span className="clear_button" title="clear">x</span>
			<input type="text" id="url" />
		</span>
		<button id="button">OK</button>
	</div>
</div>

<div id="overlay"></div>
<div id="help">
	<span className="close_button" title="close"></span>
	<div className="txt">
		<section>
			<h2>Main</h2>
			<p><span className="key">F5</span> &mdash; reload the page and display the form for loading image again</p>
			<p><span className="key">S</span> &mdash; save map params in localStorage</p>
		</section>
		<section>
			<h2>Drawing mode (rectangle / circle / polygon)</h2>
			<p><span className="key">ENTER</span> &mdash; stop polygon drawing (or click on first helper)</p>
			<p><span className="key">ESC</span> &mdash; cancel drawing of a new area</p>
			<p><span className="key">SHIFT</span> &mdash; square drawing in case of a rectangle and right angle drawing in case of a polygon</p>
		</section>
		<section>
		<h2>Editing mode</h2>
			<p><span className="key">DELETE</span> &mdash; remove a selected area</p>
			<p><span className="key">ESC</span> &mdash; cancel editing of a selected area</p>
			<p><span className="key">SHIFT</span> &mdash; edit and save proportions for rectangle</p>
			<p><span className="key">I</span> &mdash; edit attributes of a selected area (or dblclick on an area)</p>
			<p><span className="key">CTRL</span> + <span className="key">C</span> &mdash; a copy of the selected area</p>
			<p><span className="key">&uarr;</span> &mdash; move a selected area up</p>
			<p><span className="key">&darr;</span> &mdash; move a selected area down</p>
			<p><span className="key">&larr;</span> &mdash; move a selected area to the left</p>
			<p><span className="key">&rarr;</span> &mdash; move a selected area to the right</p>
		</section>
	</div>
</div>
</div>
    );
  }
  
}
export function mapStateToProps(state){
	console.log('mapStateToProps state: ',state);
	return {
		data:state.records,
	}
}
export function mapDispatchToProps(dispatch) {
	return {
		loadRecords:() => {
			dispatch(loadRecords());
		},
	  handleInput: (searchText, tabType, filterType) => {
		dispatch(loadFilterData({ searchText, tabType, filterType }));
	  },
	};
  }


EditComponent.propTypes = {
	handleInput: React.PropTypes.func,
	records: React.PropTypes.array,
	loadRecords: React.PropTypes.func,
	onNewRequest: React.PropTypes.func,
	search: React.PropTypes.object,
	handleSearchBtn: React.PropTypes.func,
	loadSubCategories: React.PropTypes.func,
	setActiveTab: React.PropTypes.func,
	updateSearchObj: React.PropTypes.func,
	loadCategoriesFilterData: React.PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(EditComponent);

