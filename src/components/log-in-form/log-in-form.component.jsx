import './log-in-form.styles.scss';

import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { SignIn } from '../../utils/firebase/firebase.utils';
import { useState } from 'react';

const defaultValues = {
    email: '',
    password: ''
};

const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
};

const LogInForm = () => {
    const [defaults, setDefaults] = useState(defaultValues);
    const { email, password } = defaults;

    const handleSubmit = (event) => {
        event.preventDefault();
    
        SignIn(email, password).catch(error => {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found")
                alert("User or Password wrong");
        });
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
                    <Button type="button" buttonType="google" onClick={logGoogleUser} >Google Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;