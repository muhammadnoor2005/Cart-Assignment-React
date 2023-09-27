import Routes from './Routes/Routes';
import './App.css';
import { useLocation } from 'react-router-dom'; 

function App() {
    const {pathname} = useLocation();
    let heading;
    if (pathname === "/"){
      heading = "Dashboard"
    }
    else if (pathname === "/view%20created%20items"){
      heading = "Created Items"
    }
    else if (pathname === "/browse%20items"){
      heading = "Browse Items"
    }
    else if (pathname === "/cart"){
      heading = "Cart"
    }
    else{
      heading = "Product Detail"
    }

    return (
      <div>
        <div className="dashBoardHeading">
                  {heading}
        </div>
        <Routes/>
      </div>
    );
}

export default App;
