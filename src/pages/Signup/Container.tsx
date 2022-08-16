import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { setIsLogged } from "../../redux/slices/authenticationSlice"
import Signup from "./Component"

const Container = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const createAccount = (password: string) => {
		fetch("http://localhost:8080/api/v1/account/create", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ password }),
		})
			.then((response) => response.json())
			.then(({ Address }) => {
				dispatch(setIsLogged(true))
				navigate("/post-signup", { state: { Address } })
			})
	}
	return <Signup onSubmit={createAccount} />
}

export default Container
