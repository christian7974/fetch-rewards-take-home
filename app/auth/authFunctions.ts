import { useRouter } from "next/router";

/**
     * Function to log the user out of the app
     * 
     * @param event event from submitting the form
     */

    const router = useRouter();

    export async function handleLogOut(event: any) {
        event.preventDefault();
        const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        router.push("/");
    }