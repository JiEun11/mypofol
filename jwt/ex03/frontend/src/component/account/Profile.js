import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { useAuthContext } from '../../auth';
import LayoutAccount from "../../layout/LayoutAccount";

export default function Profile() {
    const {accountName} = useParams();
    const {token} = useAuthContext();

    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`/api/${accountName}/profile`, {
                method: 'get',
                redirect: "follow",
                headers: {
                    'Authorization': `bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: null
            });

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }   

            console.log("!!!!!!!" + response.headers.get('X-Mypofol-Refresh-Token-At'));

            const json = await response.json();

            console.log(json);

            if (json.result !== 'success') {
                throw new Error(`${json.result} ${json.message}`);
            }

            setProfile(json.data.profile);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetchProfile();
        }, 2000);
    }, []);

    return (
        <LayoutAccount>
            <div>
                <h1>{accountName}의 Profile 페이지</h1>
                {
                    profile ? 
                        <>
                            <h4>{profile.name}</h4>
                            <h5>{profile.email}</h5>
                            <h6>{profile.phone}</h6>
                        </>
                        :
                        null
                }
            </div>
        </LayoutAccount>
    );
}