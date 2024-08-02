"use client"

import { deleteIndexedDB } from "@/db/wipeup"
import toast from "react-hot-toast";

export default function Page() {
    return <main className="container m-auto w-full p-4 bg-base-300 space-y-4 mt-8 rounded-box">
        <h2 className="bg-base-200 p-2 w-full rounded-box font-bold text-2xl text-center mb-4">Settings Page</h2>
        <h1 className="text-3xl font-bold">Settings</h1>
    </main>
}
