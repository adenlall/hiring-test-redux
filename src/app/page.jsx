"use client"
import ManageContent from "@/components/ManageContent";
import { useAppSelector } from "@/hooks";
import AddContent from "@/components/AddContent";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const { sessiontype } = useAppSelector((state) => state.sessiontype);

  return (
    <>
      <Toaster />
      <main className="container m-auto w-full p-4 bg-base-300 mt-8 rounded-box">
        {sessiontype}
        <h2 className="bg-base-200 p-2 w-full rounded-box font-bold text-2xl text-center mb-4">Home Page</h2>
        <AddContent/>
        <ManageContent/>
      </main>
    </>
  );
}
