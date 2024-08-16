

import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import AddProduct from './Components/AddProduct/AddProduct'
import ListProduct from './Components/ListProduct/ListProduct'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <AddProduct/>
      <ListProduct/>
    </div>
  )
}

export default App