import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useState} from "react";

interface LoginFormProps {
    myRouter: AppRouterInstance
}


export default function LogInForm({ myRouter}: LoginFormProps) {

    const labelStyle = "text-2xl text-onyx"
    const inputStyle = "text-onyx rounded-md h-10 text-lg px-2"

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
        <div className="bg-[#D0B8A8] p-8 rounded-md">
            <h1 className="text-3xl pb-5 text-onyx">Log in</h1>
            <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4 items-center">
                    <label htmlFor="name" className={labelStyle}>Name:</label>
                    <input id="name" name="name" placeholder="Enter your name" required value={name} className={inputStyle} onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="email" className={labelStyle}>Email:</label>
                    <input id="email" name="email" placeholder="Enter your email" required value={email} className={inputStyle} onChange={(e) => setEmail(e.target.value)}></input>

                    <button type="submit" className="bg-[#60281E] rounded-md py-2 px-2 text-2xl hover:bg-[#3E1A14] active:bg-[#9A4232]">Log In</button>
                </div>
            </form>
        </div>)
}