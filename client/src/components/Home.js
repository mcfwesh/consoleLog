import React, { Component } from "react";


export default class Home extends Component {

  render() {
    return (
    <div className='homeContainer'>
        <div className="overlay-top">
            <div className="ironBanner">
            </div>
        </div>
        <div className="overlay-bottom">
            <div className="card">
                <div className="cardImg">
                    <img src="https://i.ibb.co/sqZ80gN/webDev.jpg" alt="webdev"/>
                </div>
                <div className="cardBody">
                <h2>Web Dev</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod id purus ac vestibulum. Aenean id iaculis sapien, at varius turpis. Cras in purus vulputate, vehicula velit et, ullamcorper ipsum. Donec pellentesque pellentesque sodales. Praesent purus augue, blandit at libero sodales, commodo dapibus ligula. Fusce rhoncus gravida porttitor. Aliquam sit amet risus eu orci maximus mattis. Vestibulum vel elit et augue condimentum aliquam.</p>
                </div>
            </div>
            <div className="card">
                <div className="cardImg">
                    <img src="https://i.ibb.co/zsWB8sb/uiux.png" alt="uiux"/>
                </div>
                <div className="cardBody">
                <h2>UX/UI</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod id purus ac vestibulum. Aenean id iaculis sapien, at varius turpis. Cras in purus vulputate, vehicula velit et, ullamcorper ipsum. Donec pellentesque pellentesque sodales. Praesent purus augue, blandit at libero sodales, commodo dapibus ligula. Fusce rhoncus gravida porttitor. Aliquam sit amet risus eu orci maximus mattis. Vestibulum vel elit et augue condimentum aliquam.</p>
                  
                </div>
            </div>
            <div className="card">
                <div className="cardImg">
                    <img src="https://i.ibb.co/DKBrWHN/data-Iron-Hack.jpg" alt="data"/>
                </div>
                <div className="cardBody">
                <h2>Data</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod id purus ac vestibulum. Aenean id iaculis sapien, at varius turpis. Cras in purus vulputate, vehicula velit et, ullamcorper ipsum. Donec pellentesque pellentesque sodales. Praesent purus augue, blandit at libero sodales, commodo dapibus ligula. Fusce rhoncus gravida porttitor. Aliquam sit amet risus eu orci maximus mattis. Vestibulum vel elit et augue condimentum aliquam.</p>
                </div>
            </div>
        </div>
    </div>
    )}
}
