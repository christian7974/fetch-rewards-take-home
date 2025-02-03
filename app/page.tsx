"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogInForm from "./components/LogInForm";

export default function Home() {

    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <LogInForm
                    myRouter={router} />
                <p>{errorMessage}</p>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    );
}
