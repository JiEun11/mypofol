import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { useAuthContext } from '../../../auth';
import ExperienceItem from './ExperienceItem';
import '../../../assets/css/account/experiences/Experiences.css';

function Experiences() {
  const [experiences, setExperiences] = useState(null);
  const { token, storeToken } = useAuthContext();
  const navigate = useNavigate();
  const accountName = useOutletContext();

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`/api/${accountName}/experiences`, {
        method: "get",
        redirect: "follow",                     // redirect 응답 URL로 요청을 다시 하기 위해, (액세스 토큰이 기간이 만료되면 /api/refresh-token 리다이렉션 응답을 받을 수 있음)
        headers: {
          'Authorization': `bearer ${token}`,   // token을 Header Authorization 에 추가        
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      if (json.result !== "success") {
        throw new Error(`${json.result} ${json.message}`);
      }

      // 액세트 토큰이 재발급되면 X-Mypofol-Refresh-Token-At 헤더가 있는 응답을 받음
      // 액세트 토큰이 재발급되지 않는 보통의 경우에는 X-Mypofol-Refresh-Token-At 헤더가 없음
      const accessTokenRefreshedAt = response.headers.get('X-Mypofol-Refresh-Token-At');
      if (accessTokenRefreshedAt) {
        storeToken(json.data.accessToken);
        return;
      }

      setExperiences(json.data);

    } catch (err) {
      // 통신 에러가 나면 error 컴포넌트로 돌리고
      // 개발 중에는 화면에 내용 확인!
      // console.* 함수들은 development mode 일때는 작동하지만 production 모드일 때는 작동 안함(src/index.js 확인)      
      console.error(err);
      navigate('/error');
    }
  }

  useEffect(() => {
    fetchExperiences();
  }, [token]);  //token 상태 변화에 작동시켜야 토큰 만료될 시 다시 fetchExperiences 작동 시켜 다시 렌더링 할 수 있음.

  return (
    <div className="experiences">
      <div className="content-inner">
        <div className="content-header">
          <h2>경력</h2>
        </div>
        <div className="row align-items-center">
          {experiences && experiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Experiences;