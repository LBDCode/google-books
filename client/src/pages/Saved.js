import React, { Component } from "react";
import { DeleteBtn } from "../components/DeleteBtn";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { List, ListItem } from "../components/List";
import { FormBtn } from "../components/Form";
import StarRatingComponent from 'react-star-rating-component';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "./style.css";

class Saved extends Component {


    constructor(props) {
      super(props);
      
      this.state = {        
        books: [],
        user: "guest@guest.com",
        userName: "Guest",
        columnDefs: [{
          headerName: "Cover", field: "imageURL", cellRenderer: this.renderCover,  autoHeight: true, width: 100
        }, {
          headerName: "Author", field: "author", sortable: true, filter: true,  cellClass: 'author', resizable: true
        }, {
          headerName: "Title", field: "title", sortable: true, filter: true, cellClass: 'title', resizable: true, cellRendererFramework: this.renderTitleLink
        }, {
          headerName: "Rating", field: "rating", sortable: true, filter: true, resizable: true, cellRendererFramework: this.renderStars 
        }, {
          headerName: "Update", field: "googleID",  resizable: true, cellRendererFramework: this.renderButtons 
        }
        ],
      }

    }
  
    componentDidMount() {
      this.loadBooks();
    };

    componentDidUpdate() {
      console.log("updated");
    };
  
    loadBooks = () => {
      API.getUserBooks(this.state.user)
        .then(res => {
          this.setState({ rowData: res.data.favorites });
          this.setState({ books: res.data.favorites})
        }
        )
        .catch(err => console.log(err));  
    };

    renderCover = params => {
      if (params.value) {
        const img = "<img border='0' width='55' height='80' " +
            "style='margin: 3px' src='" + params.value + "'>";
        return img;
      } else {
          return null;
      }
    };

    
    renderTitleLink = params => {
      if (params.value) {
        const link = <a href={"/books/" + params.data.googleID}>
          <strong> {params.value} </strong>
        </a>;
        return link;
      } else {
          return null;
      }
    };

    renderStars = params => {
      if (params.value) {
        var stars =  <StarRatingComponent
            name={params.data.title} 
            starCount={5}
            value={params.value}
          />
        return stars;
      } else {
        return null;
      }
    };

    renderButtons = params => {
      if (params.value) {
        const edit = <p ><a className="edit" href={"/books/" + params.value}> edit </a></p>;
        const del = <p className="delete" onClick={() => this.deleteBook(params.value)}> delete </p>;
        return <div className="actions"> {edit} {del} </div>;
      } else {
        return null;
      }
    };

    handleClick = props => {
      console.log("clicked: "+ props);
    };
  
    deleteBook = id => {
      API.deleteBook(this.state.user, id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

    onGridReady = params => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
      window.onresize = () => {
        this.gridApi.sizeColumnsToFit();
      }
    };

    onGridSizeChanged = params => {
      // get the current grids width
      var gridWidth = document.getElementById("grid-wrapper").offsetWidth;

      // keep track of which columns to hide/show
      var columnsToShow = [];
      var columnsToHide = [];

      if (gridWidth > 600){
        columnsToShow = ["imageURL", "author", "title", "rating", "googleID"];
      } else if(gridWidth > 400 && gridWidth < 600) {
        columnsToShow = ["imageURL", "author", "title", "googleID"];
        columnsToHide = ["rating"]
      } else {
        columnsToShow = ["imageURL", "author", "title"];
        columnsToHide = ["rating", "googleID"];
      }

      // show/hide columns based on current grid width
      params.columnApi.setColumnsVisible(columnsToShow, true);
      params.columnApi.setColumnsVisible(columnsToHide, false);

      // fill out any available space to ensure there are no gaps
      params.api.sizeColumnsToFit();
    }; 

    render() {

      var searchMessage = '<div style="pointer-events: auto;">It looks like your reading list is empty!';
      searchMessage += ' Use our <a href="/search">Search</a> feature to add some books.';
      return (
        <div className="container" id="grid-wrapper" style={{height: "87vh", padding: "0", maxWidth: "100%"}}>
          <div 
            className="ag-theme-balham"
            style={{ 
            margin: "0 auto",
            height: "100%", 
            width: "100%" }} 
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
              context={this.state.context}
              overlayNoRowsTemplate={searchMessage}
              frameworkComponents={this.state.frameworkComponents}
              onGridReady={this.onGridReady}
              onGridSizeChanged={this.onGridSizeChanged}
            >  
            </AgGridReact>
          </div>
        </div>
      );
    }
  }
  
  export default Saved;
  
