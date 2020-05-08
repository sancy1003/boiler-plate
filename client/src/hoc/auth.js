import React, {useEffect} from 'react';
import Axios from 'axios';
import { auth } from '../_action/user_action'
import { useDispatch} from 'react-redux';


// option null = 아무나 접근 가능, true = 로그인한 사람만 접근 가능, false = 로그인 안한사람만 접근 가능
export default function (SpecificComponent, option, adminRoute = null) {

    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else {
                        if(option === false) {
                            props.history.push('/')
                        }
                    }                
                }
            })

        }, [])
        
        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}