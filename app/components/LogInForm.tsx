import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useState} from "react";

interface LoginFormProps {
    myRouter: AppRouterInstance
}


export default function LogInForm({ myRouter}: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    async function handleLogin(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ name: name, email: email }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (response.status === 200) {
            myRouter.push("/dogsScreen");
        }
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" required value={name} className="text-black" onChange={(e) => setName(e.target.value)}></input>

                <label htmlFor="email">Email:</label>
                <input id="email" name="email" required value={email} className="text-black" onChange={(e) => setEmail(e.target.value)}></input>

                <button type="submit">Press me</button>
            </form>
        </>)
}