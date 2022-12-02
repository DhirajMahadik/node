import { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'


const App = () => {

  const [List, setList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [Name, setName] = useState("")
  const [Price, setPrice] = useState("")
  const [ID, setID] = useState("")
  const [UpdatedName, setUpdatedName] = useState("")
  const [UpdatedPrice, setUpdatedPrice] = useState("")

  const GetProduct = async (id) => {
    setID(id)
    let data = await fetch(`http://localhost:5000/product/${id}`, {
      method: "get"
    });
    let res = await data.json();
    setUpdatedName(res[0].name);
    setUpdatedPrice(res[0].price)


  }

  const UpdateData = async () => {

    // if(UpdatedPrice.type !== "number")
    // {
    //   alert("Please enter valid data")
    // }
    // else{
    let data = await fetch(`http://localhost:5000/update/${ID}`, {
      method: "put",
      body: JSON.stringify({ name: UpdatedName, price: UpdatedPrice }), headers: { "Content-Type": "application/json" }
    });
    let res = await data.json();
    console.log(res)
    getData()
    // }



  }





  const getData = async () => {
    let data = await fetch('http://localhost:5000/list')
    let list = await data.json()
    setList(list)
    console.log(list)
  }

  const DeleteData = async (id) => {
    console.log(id)
    let result = await fetch(`http://localhost:5000/delete/${id}`, { method: "delete" });
    let res = await result.json();
    console.log(res)
    getData()
  }

  const AddData = async () => {
    let result = await fetch('http://localhost:5000/add', { method: "POST", body: JSON.stringify({ name: Name, price: Price }), headers: { "Content-Type": "application/json" } })
    let res = await result.json();
    console.log(res)
    getData();

  }

  const SearchHandler = async(e)=>{
      let key = e.target.value ;
      if(key){
        let data = await fetch(`http://localhost:5000/search/${key}`, { method:"get"})
        let res = await data.json();
        console.log(res);
        if(res){
          setList(res)
        }
        
        
      }
      else{
        getData()
      }
     
     
     
  }

//

  useEffect(() => {

    // a = 10;
    // var a;
    // console.log(a)

    // var x = 2;
    // var y = 0;

    // if (x) {
    //   console.log(x)
    // }

    // if (y) {
    //   console.log(y)
    // }

    // b = 20;
    // let b;
    // console.log(b)

    getData();
   
    // eslint-disable-next-line
  }, [])

  return (
    <>
 <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex">
              <input onChange={(e)=>SearchHandler(e)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="button">Search</button>
            </form>
          </div>
        </nav>
      <div className="d-flex  " style={{ color: "ActiveBorder", padding: "20px 50px" }}>
       
      <table className=" table table-primary table-bordered border-dark  " style={{ margin: "auto", textAlign: "center" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th colSpan={2}>Action</th>
              <th>History</th>
            </tr>

          </thead>
          { List.length > 0 ? <tbody>
            {List.map((element) => {
              let date = element.updatedAt;

              return <tr key={element._id}>
                <td>{element.name}</td>
                <td>{element.price}</td>
                <td><button onClick={() => GetProduct(element._id)} type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Update
                </button></td>
                <td><button className="btn btn-sm btn-danger" onClick={() => DeleteData(element._id)} >Delete</button></td>
                <td>Last updated <br />{new Date(date).toGMTString()}</td>
              </tr>

            })}
            <tr ><td colSpan={5}><button className="btn btn-success" onClick={getData}> Get Data</button></td></tr>
          </tbody>:<tr> <td colSpan={5}>No result found</td></tr>}

        </table>  

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"> Update here</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <form>
                  <label>Name</label>
                  <input onChange={(e) => setUpdatedName(e.target.value)} style={{ display: "block", margin: "10px 0" }} type="text" name="name" value={UpdatedName} />
                  <label>Price</label>
                  <input onChange={(e) => setUpdatedPrice(e.target.value)} style={{ display: "block" }} type="text" name="name" value={UpdatedPrice} />

                </form>


              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={UpdateData} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ color: "ActiveBorder", padding: " 20px 50px" }}>
        <form>
          <h2>Insert here</h2>
          <label>Name</label>
          <input onChange={(e) => setName(e.target.value)} style={{ display: "block", margin: "10px 0" }} type="text" name="name" value={Name} />
          <label>Price</label>
          <input onChange={(e) => setPrice(e.target.value)} style={{ display: "block" }} type="text" name="name" value={Price} />
          <button onClick={AddData} style={{ marginTop: "10px" }} type="button"> Insert Data</button>
        </form>
      </div>

    </>
  )
}

export default App;