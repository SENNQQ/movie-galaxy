import React, {useState} from 'react';
import '../../style/authorization.scss';
import {useForm} from 'react-hook-form'
import visiblePassImg from '../../image/visible-password.png';
import hiddenPassImg from '../../image/hidden-password.png';
import {useLocation} from "react-router-dom";
import {fetchUser} from "../../store/user/slice";
import {useAppDispatch} from "../../store/hook";

type FormInputs = {
    email: string;
    password:string;
    nickname:string;
}

const Authorization = () => {

    const location = useLocation();
    const locationRegister = location.pathname === "/register";
    const dispatch = useAppDispatch();

    const [visiblePass, setVisiblePass] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit = (data:any) => {
        dispatch(fetchUser(data))
    };

    const validatePassword = (value: string) => {
        if (value.match(/[a-z]/g) && value.match(/[a-z]/g)!.length >= 2 && value.match(/[A-Z]/g) && value.match(/[A-Z]/g)!.length >= 2) {
            return true;
        } else if (value.match(/[а-яА-Я]/g)) {
            return 'The password must contain only latin letters, numbers or special characters';
        } else return 'Password must contain at least 2 characters (a-z) and 2 characters (A-Z)';
    };

    return (
        <>
            <div className="container">
                <div className="form_wrapper">
                    <div className="login_form_main">
                        <h1 className="login_form_main__title">{locationRegister ? "Sign Up": "Sign In"}</h1>
                        <form className="form_galaxy" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form_galaxy_group">
                                <div className="form_galaxy_block">
                                    <input type="text"
                                           placeholder={"E-mail address"}
                                           className="nfTextField error"
                                           id="id_userLoginId"
                                           autoComplete="email" dir=""
                                           {...register('email', {
                                               required: {
                                                   value: true,
                                                   message: 'Required field',
                                               },
                                               pattern: {
                                                   value: /^(([^<>()[\]\\.,;:\s@а-яА-ЯA-Z"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-z-]+\.)+[a-z]{2,}))$/,
                                                   message: 'Invalid mail format, example: test@test.test',
                                               },
                                           })}/>
                                    {errors.email && <div className="errors">{errors.email.message}</div>}
                                </div>
                                <div className="form_galaxy_block form_galaxy_block__pass">
                                   <div className="form_galaxy_block__pass">
                                       <input type={visiblePass ? "text" : "password"}
                                              className="nfTextField error"
                                              id="id_password"
                                              autoComplete="password"
                                              placeholder="Password"
                                              {...register('password', {
                                                  required: {
                                                      value: true,
                                                      message: 'Required field',
                                                  },
                                                  minLength: {value: 8, message: 'Minimum password length 8 characters'},
                                                  validate: validatePassword,
                                              })}/>
                                       <label onClick={() => setVisiblePass(!visiblePass)}
                                              style={{backgroundImage: `url(${visiblePass ? visiblePassImg : hiddenPassImg})`}}/>
                                   </div>
                                    {errors.password && <div className="errors">{errors.password.message}</div>}
                                </div>
                                {locationRegister &&
                                    <div className="form_galaxy_block">
                                    <input type="text"
                                           className="nfTextField error"
                                           id="id_nickname"
                                           placeholder="Nickname"
                                           {...register('nickname', {
                                               required: {
                                                   value: true,
                                                   message: 'Required field',
                                               },
                                               minLength: {value: 8, message: 'Minimum password length 8 characters'},
                                           })}/>
                                </div>
                                }
                            </div>
                            <div className="form_galaxy_group">
                                <div className="form_galaxy_block">
                                    <button className="btn login-button btn-submit btn-small" type="submit">{locationRegister ? "Sign Up": "Sign In"}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {locationRegister ? "" : <div className="login_form_other">
                        <div className="login_signup_now">First time on Movie Galaxy?
                            <a target="_self" href="/">Sign Up Now.</a>
                        </div>
                    </div>}
                </div>
            </div>
        </>
);
};

export default Authorization;