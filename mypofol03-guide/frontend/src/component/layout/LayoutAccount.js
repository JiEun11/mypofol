import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuthContext } from '../../auth';
import Header from './Header';
import Footer from './Footer';
import SidebarAccount from './SidebarAccount';
import '../../assets/css/layout/LayoutAccount.css';

const LayoutAccount = () => {
    const [account, setAccount] = useState(null);
    const { token, storeToken } = useAuthContext();
    const { accountName } = useParams();
    const navigate = useNavigate();
    const authAccount = useOutletContext();

    const fetchAccount = async () => {
        try {
            const response = await fetch(`/api/${accountName}`, {
                method: 'get',
                redirect: 'follow',                         // redirect 응답 URL로 요청을 다시 하기 위해, (액세스 토큰이 기간이 만료되면 /api/refresh-token 리다이렉션 응답을 받을 수 있음)
                headers: {
                    'Authorization': `bearer ${token}`,     // token을 Header Authorization 에 추가
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }

            const json = await response.json();
            if (json.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            // 액세트 토큰이 재발급되면 X-Mypofol-Refresh-Token-At 헤더가 있는 응답을 받음
            // 액세트 토큰이 재발급되지 않는 보통의 data fetch의 경우에는 X-Mypofol-Refresh-Token-At 헤더가 없음
            const accessTokenRefreshedAt = response.headers.get('X-Mypofol-Refresh-Token-At');
            if (accessTokenRefreshedAt) {
                storeToken(json.data.accessToken);
                return;
            }

            setAccount(json.data);

        } catch (error) {
            // 통신 에러가 나면 error 컴포넌트로 돌리고
            // 개발 중에는 화면에 내용 확인!
            // console.* 함수들은 development mode 일때는 작동하지만 production 모드일 때는 작동 안함(src/index.js 확인)
            console.error(error);
            navigate('/error');
        }
    };

    useEffect(() => {
        document.body.className = '';
    }, []); // 컴포넌트가 마운트 될 때 한 번만!
            // body 태그의 css class를 클리어 함. 
            // 이전 화면이 main, welcome, 로그인, 로그아웃, 에러페이지 등이면 body css class에 full-wide가 셋 되어 있기 때문

    useEffect(() => {
        fetchAccount();
    }, [accountName]); // URL Path의 accountName이 달라 지면(accountName에 의존하여) fetchAccount 실행.       

    return (
        <> 
            <Header path={account ? { link: account.name, name: account.name } : null} account={authAccount} />
            <div className={'wrapper'}>
                {   /* 서버로 부터 account 정보를 가져와야 그릴 수 있는 컴포넌트들이기 때문에 상태 account에 의존하여 선택 렌더링 함 */
                    account ?
                        <>
                            <SidebarAccount account={account} />
                            <div className={'content'}>
                                <Outlet context={accountName}/>
                                <Footer />
                            </div>
                        </>
                        :
                        null
                }
            </div>
        </>
    );
};

export default LayoutAccount;