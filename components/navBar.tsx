import React from 'react';

class NavBar extends React.Component<{}, { isBoxVisible: boolean }> {
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
          isBoxVisible:false
        };
      }
    
      toggleBox = () => {
        this.setState( {isBoxVisible:!this.state.isBoxVisible});
      };


    render(){
        console.log(this.state);
        return (
    <nav className="navbar navbar-expand bg-dark navbar-dark justify-content-end" role = "navigation">
  <a className="navbar-brand" href="#">Event Organizer</a>
  <button className="navbar-toggler navbar-toggler-right indexcity" onClick={this.toggleBox} type="button">
    TOGGLE
    {/* <span className="navbar-toggler-icon"></span> */}
  </button>

  {/* Inline Navbar */}
  <div className="navbar-collapse">
  <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
    </ul>
  </div> 

{/* Custom Side bar */}
  <div className={this.state.isBoxVisible ? "collapse navbar-collapse right":"hideIt"} id="collapsibleNavbar">
  <div className="wrapper">
    
    <nav id="sidebar">
        <div className="sidebar-header">
            <h3>Custom Sidebar</h3>
        </div>

        <ul className="list-unstyled components">
            <p>Dummy Heading</p>
            <li className="active">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>
    </nav>

</div>
  </div>  


</nav>
        );
    }
}

export default NavBar