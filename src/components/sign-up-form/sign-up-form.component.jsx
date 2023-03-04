import { useState } from "react";

import './sign-up-form.styles.scss';

import { createAuthUserWithEmailAndPasswordAndDisplayName } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from '../button/button.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!displayName || !email || !password || !confirmPassword) return;

        if (password === confirmPassword) {
            createAuthUserWithEmailAndPasswordAndDisplayName(email, password, displayName).catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert("the provided email is already in use");
                }
            });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };


    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>SignUp with tour email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Display Name"} type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label={"Email"} type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label={"Password"} type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label={"Confirm Password"} type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
                <Button type="submit">Sign-Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;