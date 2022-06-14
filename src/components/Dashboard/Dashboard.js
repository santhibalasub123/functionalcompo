import './Dashboard.css';
import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
const Dashboard=()=>{

  const[getList,setList] =  useState([]);
  const[getIndex,setIndex]=useState(-1);
  const[getSearch,setSearch]=useState('');

 
  const [getExpense, setExpense] = useState({
    BookName: '',
    BookID: '',
    AuthorName: '',
    paid: '',
    date: ''
  });
  

     useEffect(()=>{
      axios.get('http://localhost:3000/library').then((response)=>{
        console.log(response.data)
        setList(response.data);
    }).catch((error)=>{
      console.log(error);
    }) 
       
            // if(JSON.parse(sessionStorage.getItem('BookDetails')) && JSON.parse(sessionStorage.getItem('BookDetails')).length>0){
            //    setList(JSON.parse(sessionStorage.getItem('BookDetails')))
            // }
     },[])
     const onDeleteHandler=(index)=>{
      let expenseDetails = [...getList];
      let id = expenseDetails[index].id;
      axios.delete('http://localhost:3000/library/'+id).then((response)=>{
       expenseDetails.splice(index,1);
       setList(expenseDetails);
      }).catch(()=>{

      })

      // sessionStorage.setItem('BookDetails',JSON.stringify(expenseDetails));
     }
     const onEditHandler=(index)=>{
      setExpense({
        BookName:getList[index].BookName,
        BookID:getList[index].BookID,
        AuthorName:getList[index].AuthorName, 
        paid:getList[index].paid,
        date:getList[index].date,
      })
      setIndex(index);
     }
     const onChangeHandler=(event)=>{
      setExpense({
        ...getExpense,[event.target.name]:event.target.value
      })
    }

    const onChangeSearchHandler=(event)=>{
      setSearch(event.target.value);
    }


    const onEditSubmitHandler=(event)=>{
      event.preventDefault();
      let expenseDetails =[...getList];
      let id= expenseDetails[getIndex].id;
      axios.patch('http://localhost:3000/library/'+id,{
        BookName: getExpense.BookName,
        BookID:getExpense.BookID ,
        AuthorName:getExpense.AuthorName,
        paid:getExpense.paid,
        date: getExpense.date
    }).then(()=>{
      setList(expenseDetails);
          expenseDetails[getIndex].BookName = getExpense.BookName;
      expenseDetails[getIndex].BookID=getExpense.BookID;
      expenseDetails[getIndex].AuthorName=getExpense.AuthorName;
      expenseDetails[getIndex].paid = getExpense.paid;
      expenseDetails[getIndex].date = getExpense.date;
  }).catch(()=>{
      //sessionStorage.setItem('expenseDetails',JSON.stringify(expenseDetails));
    })}

    const searchFilter=(event)=>{
      event.preventDefault();
      let details = getList.filter((obj)=>{
        return obj.BookName === getSearch; 
      })
      setList(details);
    }

    const resetFilter=(event)=>{
        event.preventDefault();
        setSearch('');
        if(JSON.parse(sessionStorage.getItem('BookDetails')) && JSON.parse(sessionStorage.getItem('BookDetails')).length>0){
          setList(JSON.parse(sessionStorage.getItem('BookDetails')))
       }
    }

    return (<div>
       <div className="container-fluid">
              <div className="row">
                <div className="col-3">
                    <form>        
                        <div className="form-group">
                          <label>Book name</label>
                          {/* <input type="email" className="form-control" id="email" placeholder="Enter email"/> */}
                          <input type="text" value={getSearch} onChange={onChangeSearchHandler} className="form-control" id="BookName" name="searchExpenseName" placeholder="Enter Book Name"/>

                        </div>       
                        {/* <button type="submit" className="btn btn-success">Search</button> */}
                        <button onClick={searchFilter} type="submit" className="btnsearch">Search</button>
                        <button onClick={resetFilter} className="btnreset">Reset</button>
                      </form>
                </div>
                <div className="col-7"></div>
                <div className="col-2">
                <button type="submit" className="btn"><Link to="/addExpense">Add Book</Link></button>
                </div>
                
              </div>
              <div className="row">
                  <div className="col-12">
                    <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">BOOK Name</th>
                            <th scope="col">BOOKIID</th>
                            <th scope="col">AuthorName</th>
                            <th scope="col">paid</th>
                            <th scope="col">date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
             
                        {getList.map((obj,index)=>{
                           return(<tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{obj.BookName}</td>
                            <td>{obj.BookID}</td>
                            <td>{obj.AuthorName}</td>
                            <td>{obj.paid}</td>
                            <td>{obj.date}</td>
                            <td><i onClick={()=>onEditHandler(index)} data-toggle="modal" data-target="#edit" className="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                            <td><i onClick={()=>onDeleteHandler(index)} className="fa fa-trash" aria-hidden="true"></i></td>
                          </tr>
                           )
                        })
                        }
                        
                        
                 
                 
                
                       
                        </tbody>
                      </table>
                  </div>
              </div>
     
          </div>
 
          <div className="modal fade" id="edit"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Update Book</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <form>
                      <div className="form-group">
                          <label>BOOK Name</label>
                          <input type="text"  value={getExpense.BookName} onChange={onChangeHandler} name="BookName" className="form-control" id="firstName"  placeholder="Enter first name"/>
                        </div>
                        <div className="form-group">
                          <label>BOOK ID</label>
                          <input  value={getExpense.BookID} onChange={onChangeHandler} type="text" name="BookID" className="form-control" id="lastName"  placeholder="Enter last name"/>
                        </div>
                        
                      <div className="form-group">
                        <label>Authorname</label>
                        <input value={getExpense.AuthorName} onChange={onChangeHandler} type="text" name="AuthorName" className="form-control" id="email" placeholder="Enter email"/>
                      
                      </div>
                      <div className="form-group">
                        <label>paid</label>
                        <input value={getExpense.paid} onChange={onChangeHandler} type="text" name="paid" className="form-control" id="email" placeholder="Enter email"/>
                      
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input value={getExpense.date} onChange={onChangeHandler} type="date"  name="date" className="form-control" id="password" placeholder="Password"/>
                      </div>
                  
                      <button data-dismiss="modal" onClick={onEditSubmitHandler} type="submit" className="btn">ADD</button>
                    </form>
        </div>
       
      </div>
    </div>
  </div>
    </div>)
}
export default Dashboard;