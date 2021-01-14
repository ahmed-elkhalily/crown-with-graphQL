import React from "react"
import FormInput from "../form-input/form-input.component"
import { auth, signInWithGoogle } from "../../firebase/firebase.utils"
import CustomButton from "../custom-button/custom-button.component"
import "./sign-in.styles.jsx"
import { CustomBtnContainer, SigninComponentStyled } from "./sign-in.styles.jsx"

class SignIn extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: "", password: "" })
        } catch (error) {
            console.log(error)
        }
    }

    handleChange = (event) => {
        const { value, name } = event.target

        this.setState({ [name]: value })
    }

    render() {
        return (
            <SigninComponentStyled>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label="email"
                        required
                    />
                    <FormInput
                        name="password"
                        type="password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="password"
                        required
                    />
                    <CustomBtnContainer>
                        <CustomButton type="submit"> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </CustomBtnContainer>
                </form>
            </SigninComponentStyled>
        )
    }
}

export default SignIn
