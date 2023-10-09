import React from 'react';
import { useOutletContext } from 'react-router';
import '../../../assets/css/account/projects/Projects.css';

const Projects = () => {
    const accountName = useOutletContext();

    return (
        <div className="projects">
            <div className="content-inner">
                <div className="content-header">
                    <h2>프로젝트</h2>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <div className="prj-col">
                            <span>2023.10<i>~</i> 2023.12</span>
                            <h3>Mypofol</h3>
                            <h4>Project Manager</h4>
                            <p>
                                Mypofol 짱
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;