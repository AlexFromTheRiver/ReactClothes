//import './navigation.styles.scss';
import { NavigationContainer, NavLinksContainer, NavLink, LogoContainer } from "./navigation.styles";
import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    console.log(isCartOpen);

    const signOutHandler = async () => {
        await signOutUser();
    };

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrwnLogo />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to="/shop">
                        Shop
                    </NavLink>
                    {currentUser ? (
                            <NavLink as = 'span' onClick={signOutHandler}> Sign-Out </NavLink>
                        ) : (
                            <NavLink to="/auth"> Sign-In </NavLink>
                        )
                    }
                <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;