import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Account() {
  const { accountName } = useParams();
  const [projects, setProjects] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`/api/${accountName}/projects`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }

      console.log(json);
      setProjects(json.data);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(()=> {
    fetchProjects();
  }, []);

  const onButtonClickGet = () => {
    fetchProjects();
  };

  const onButtonClickCreate = async () => {
    const newProject = {
      name: "posco dx",
      role: "project manager",
      description: "포스코 프로젝트",
      fromDate: "2023-09",
      toDate: null
    };

    try {
      const response = await fetch(`/api/${accountId}/projects`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newProject)
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      console.log(json);
      setProjects([json.data, ...projects]);
    } catch (error) {
      console.error(error);
    }
  }

  const onButtonClickDelete = async () => {
    try {
      const response = await fetch(`/api/${accountId}/projects?id=18`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }
      console.log(json.data);
      const n = projects.filter((project) => {
        return project.id !== Number(json.data);
      })
      setProjects(n);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Hello {accountName} </h1>
      <h3>{accountName}님의 학력사항</h3>
      <ul>
        {projects && projects.map((project) => (
          <li key={project.id}>
            {project.id} : {project.name}
          </li>
        ))}
      </ul>
      <button onClick={onButtonClickGet}>가져오기</button>
      <button onClick={onButtonClickCreate}>만들기</button>
      <button onClick={onButtonClickDelete}>지우기</button>
    </div>
  )
}
