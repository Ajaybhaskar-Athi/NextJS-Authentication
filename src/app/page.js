import { fetchAuthUserAction } from "@/server-actions";

export default async function Home() {
    const currUser = await fetchAuthUserAction();

    if (!currUser.success) {
        return (
            <div>
                <h1>{currUser.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to NEXT JS Authentication {currUser?.data?.userName}</h1>
            <h2>{currUser?.data?.email}</h2>
            <h2>{currUser?.data?.password}</h2>
        </div>
    );
}
