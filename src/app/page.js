import { fetchAuthUserAction } from "@/server-actions";
import { redirect } from "next/navigation";
import SignOut from "./sign-out";

export default async function Home() {
    const currUser = await fetchAuthUserAction();
    if(!currUser?.success) redirect("/sign-in");

    return (
        <div>
            <h1>Welcome to NEXT JS Authentication {currUser?.data?.userName}</h1>
            <h2>{currUser?.data?.email}</h2>
            <h2>{currUser?.data?.password}</h2>
            <SignOut/>
        </div>
    );
}
