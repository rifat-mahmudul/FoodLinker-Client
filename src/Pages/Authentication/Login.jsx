import LoginForm from "../../components/Form/LoginForm"
import HelmetTitle from "../../components/Shared/HelmetTitle"

const Login = () => {
    return (
        <section className='py-16'>

            <HelmetTitle title='Login'></HelmetTitle>

            <LoginForm></LoginForm>
        </section>
    )
}

export default Login
