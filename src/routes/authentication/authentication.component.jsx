import './authentication.styles.scss';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import LogInForm from '../../components/log-in-form/log-in-form.component';

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <LogInForm />            
            <SignUpForm />
        </div>
    );
};

export default Authentication;