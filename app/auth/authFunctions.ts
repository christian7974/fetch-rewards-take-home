import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
     * Function to log the user out of the app
     * 
     * @param event event from submitting the form
     */
    export async function handleLogOut(event: any, router: AppRouterInstance) {
        event.preventDefault();
        const response = await fetch(`${process.env.BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        });
        router.push("/");
    }