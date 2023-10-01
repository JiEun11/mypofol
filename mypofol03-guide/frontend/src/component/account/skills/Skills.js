import React from 'react';
import { useOutletContext } from 'react-router';
import '../../../assets/css/account/skills/Skills.css';

const Skills = () => {
    const accountName = useOutletContext();

    return (
        <div className="skills">
            <div className="content-inner">
                <div className="content-header">
                    <h2>주요기술</h2>
                </div>
                <div className="row align-items-top">
                    <div className="col-md-6">
                        <div className="skills-col">
                            <h3>
                                <i className="fa fa-ellipsis-vertical"></i>
                                <span>BackEnd</span>
                            </h3>
                            <div className="skillsets">
                                <div className="skill-name">
                                    <p>Java / Spring</p>
                                    <p>Lvl.3</p>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="3" aria-valuemin="0" aria-valuemax="5" style={{ width: (3 / 5) * 100 }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;