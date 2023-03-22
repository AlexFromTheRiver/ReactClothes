import './log-in-form.styles.scss';
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { signInWithGooglePopup, SignIn } from '../../utils/firebase/firebase.utils';

const defaultValues = {
    email: '',
    password: ''
};

const LogInForm = () => {
    const [ defaults, setDefaults ] = useState(defaultValues);
    const { email, password } = defaults;

    const handleSubmit = (event) => {
        event.preventDefault();

        SignIn(email, password)
            .catch(error => {
                if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found")
                    alert("User or Password wrong");
            });
    };

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    };

    const changeHandler = (event) => {
        const { name, value } = event.target;

        setDefaults({ ...defaults, [name]: value });
    };

    return (
        <div className='log-in-container'>
            <h2>Use your existing account</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label={"eMail"} required onChange={changeHandler} type="email" name="email" value={email} />
                <FormInput label={"Password"} required onChange={changeHandler} type="password" name="password" value={password} />
                <div className='buttons-container'>
                    <Button type="submit">LogIn</Button>
                    <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser} >Google Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;