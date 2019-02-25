import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {listProject: []};
    }
    componentDidMount() {
        fetch("/data/api.json")
        .then(response => {
            if (!response.ok) {
            throw new Error("Bad response");
            }
            return response.json();
        })
        .then((responseData) => { 
            this.setState({ 
                listProject: responseData.project_list,
            }); 
        })  
        .catch(error => console.error(error));

    }
    render() {
        const projectlist = this.state.listProject.map((project_info) => 
                    <li key={project_info.project_name }><Link to={"/heatmap/"+project_info.project_id}>{project_info.project_name}</Link></li>

        );

        return (  
            <div>
                 <Navigation />
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <section className="info-board">
                                    <p><span className="title-info">Username</span>: Info</p>
                                    <p><span className="title-info">Email</span>: info@test.com</p>
                                    <p><span className="title-info">Phone</span>: 0123-456789</p>

                                </section>
                            </div>
                            <div class="col-md-9">
                                <ol className="wrapper-project">
                                    {projectlist}
                                </ol>
                            </div>
                        </div>    
                    </div>
            </div>
               
            

        );
  
    }
}
export default Profile;