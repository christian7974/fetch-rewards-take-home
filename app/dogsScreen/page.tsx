"use client"
import { useRouter } from "next/navigation";

export default function dogsScreen() {

    const router = useRouter();

    async function handleLogOut(event: any) {
        event.preventDefault();
        const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (response.status === 200) {
            router.push("/");
        }
    }

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>dogsScreen</h1>
                <form onSubmit={handleLogOut}>
                    <button type="submit">log out</button>
                </form>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

            </footer>
        </div>
    ); 
}