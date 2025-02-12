"use client"

import { useAppDispatch } from "@/hooks";
import { resetContent } from "@/redux/slices/content.slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    return <main className="container m-auto w-full p-4 bg-base-300 space-y-4 mt-8 rounded-box">
        <h2 className="bg-base-200 p-2 w-full rounded-box font-bold text-2xl text-center mb-4">Settings Page</h2>
        <h1 className="text-3xl font-bold">Settings</h1>
        <ul className="p-4 m-auto outline rounded-box space-y-2 outline-error">
            <li className="bg-error/50 flex items-center justify-between rounded-box p-2 pl-4">
                <span className="font-bold text-lg">Delete all stored data</span>
                <Modal button={"Remove"} onclick={() => {
                    dispatch(resetContent());
                    toast.success('all data has been removed');
                    router.push("/");
                }} />
            </li>
        </ul>
    </main>
}

const Modal = ({ button, onclick }) => (
    <>
        <button className="btn btn-error" onClick={() => document?.getElementById('my_modal_2').showModal()}>{button}</button>
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Are you sur!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => onclick()} className="btn btn-error">Confirm</button>
                    <form method="dialog">
                        <button className="btn btn-info">Cancel</button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
)