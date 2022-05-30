import AppBar from "./AppBar"
import Footer from "./Footer"

export  default function Layout({children}){
  return (

    <div className="App">
          <AppBar />
          
          <div className="body" style={{flexGrow: 1}}>
            {children}
          </div>
            
          <Footer></Footer>
    </div>

    );
  }