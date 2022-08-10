import { FormEvent } from "react"
import { useNavigate } from "react-router"
import HomeComponent from "./Component"

function HomeContainer() {
	const navigate = useNavigate()
	const createAccount = (event: FormEvent) => {
		event.preventDefault()
		fetch("http://localhost:8080/api/v1/account/create", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ password: "abcdef" }),
		})
			.then((response) => response.json())
			.then((body) => alert(JSON.stringify(body)))
	}
	return <HomeComponent navigate={navigate} onSubmit={createAccount} />
}

export default HomeContainer
