import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Papa from "papaparse";
import ShowHideSection from './ShowHideSection';
import Modal from '../UI/Modal';
import ScholarDetail from '../../pages/Admin/AdminScholar/ScholarDetail';


function DataList() {
    const [userlist, setuserlist] = useState([]);
    const [data, setData] = useState([]);
    const [citationdata, setCitationData] = useState([]);
    const [showNewComponent, setShowNewComponent] = useState(false);
    const[author,setAuthor]=useState("");
    useEffect(() => {

        fetch('/citation.json')
            .then(response => response.json())
            .then(result => setCitationData(result))
            .catch(error => console.log(error))
    }, [])
    useEffect(() => {
        async function getData() {
          const response = await fetch('/jaypeeTeachers.csv');
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder('utf-8');
          const csv = decoder.decode(result.value);
          const { data } = Papa.parse(csv, { header: true });
          setData(data);
        }
        getData();
      }, []);

    const columns = [
       
        { dataField: 'Faculty', text: 'Faculty', sort: true, filter: textFilter(),
        events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
                console.log(`Value: ${row[column.dataField]}`);
                setAuthor(row[column.dataField]);
              setShowNewComponent(true);
            }
          } },
        { dataField: 'Email', text: 'Email', sort: true, filter: textFilter() },
        { dataField: 'InterestArea', text: 'InterestArea', sort: true, filter: textFilter() },
        { dataField: 'Profile', text: 'Profile', sort: true, filter: textFilter() },
        
        { dataField: 'Citation', text: 'Citation', sort: true},
        { dataField: 'total_pub', text: 'Total Publications', sort: true},
        

    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);

        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }

    });

    
    console.log(data)
    console.log(columns)
    for (let key in data) {
      if (data.hasOwnProperty(key) && citationdata.hasOwnProperty(key)) {
        console.log(key + ' is present in both objects');
        data[key]["Citation"] = citationdata[key]["citation"];
        data[key]["total_pub"]=citationdata[key]["total_pub"];
        data[key]["name"]=citationdata[key]["name"];
        console.log(data[key]["total_pub"])
      } else {
        console.log(key + ' is not present in obj2');
        data[key]["Citation"] = "Nan";
        data[key]["total_pub"] = "Nan";
      }
    }
    
      console.log(data)
     
      const toggleNewComponent = () => {
        setShowNewComponent(!showNewComponent);
      };
      
    return (
    
    <div>
         {showNewComponent ? <Modal><ScholarDetail author={author}></ScholarDetail></Modal> : null}

        <BootstrapTable bootstrap4 keyField='id' columns={columns} data={data} pagination={pagination} filter={filterFactory()} />
        {/* <table>
            <tr> 
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
            {
                userlist && userlist.length>0 ?
                userlist.map(usr=>
                    <tr>
                        <td>{usr.id}</td>
                        <td>{usr.name}</td>
                        <td>{usr.username}</td>
                        <td>{usr.email}</td>
                    </tr>
                    )
                    :'Loading'
            }
        </table> */}
    </div>)
}

export default DataList;