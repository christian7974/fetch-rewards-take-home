"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    async function handleLogin(event: any) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        console.log(`the name is ${name} and the email is ${email}`)
        console.log(formData);
        const response = await fetch(`${process.env.BASE_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ name: name, email: email }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        setErrorMessage(`${response.status}`);

    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <form onSubmit={handleLogin}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" name="name" required value={name} className="text-black" onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" required value={email} className="text-black" onChange={(e) => setEmail(e.target.value)}></input>

                    <button type="submit">Press me</button>
                </form>
                <p>{errorMessage}</p>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
