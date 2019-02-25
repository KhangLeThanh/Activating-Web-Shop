import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import 'react-calendar-heatmap/dist/styles.css';
import Navigation from './Navigation';


class Heatmap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            heatmap: [],
            data: []

        };
    }
    getTooltipDataAttrs = (value) => {
        // Temporary hack around null value.date issue
        if (!value || !value.date) {
          return null;
        }
        // Configuration for react-tooltip
        return {
          'data-tip': `${value.date.slice(0, 10)} has count: ${value.count}`,
        };
    };

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
                heatmap: responseData.project_list,
            }); 
        })  
        .catch(error => console.error(error));
    }
    render() {
        const project_id = this.state.id;

        const heatmap_detail =  this.state.heatmap
            .filter(function(details) {
                return details.project_id == project_id;
            })
            .map(function(details){
                return  <h3 key={details.project_name }>{details.project_name}</h3>             
    })
    return (
        <div className="App">
            <Navigation />

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {heatmap_detail}    
                        <CalendarHeatmap
                            startDate={new Date('2017-12-31')}
                            endDate={new Date('2018-12-31')}
                            values={[
                                { date: '2018-01-01', count: 4 },
                                { date: '2018-03-01', count: 3 },
                                { date: '2018-10-01', count: 4 },
                                { date: '2018-12-01', count: 2 }
                            ]}
                            
                            classForValue={(value) => {
                            if (!value) {
                                return 'color-empty';
                            }
                            return `color-scale-${value.count}`;
                            }}
                            tooltipDataAttrs={this.getTooltipDataAttrs}
                        />
                        <ReactTooltip />
                        <div className="wrapper-legend">
                            <svg className="legend" width="20" height="20">
                                <rect className="color-scale-1" width="20" height="20"/>
                                Sorry, your browser does not support inline SVG.  
                            </svg>
                            <svg className="legend" width="20" height="20">
                                <rect className="color-scale-2" width="20" height="20"/>
                                Sorry, your browser does not support inline SVG.  
                            </svg>
                            <svg className="legend" width="20" height="20">
                                <rect className="color-scale-3" width="20" height="20"/>
                                Sorry, your browser does not support inline SVG.  
                            </svg>
                            <svg className="legend" width="20" height="20">
                                <rect className="color-scale-4" width="20" height="20"/>
                                Sorry, your browser does not support inline SVG.  
                            </svg>
                            <span> Fewer to More</span>
                        </div>
                        
                    </div>
                </div>
        </div>
        
        
        </div>
    );
    }
}
export default Heatmap;