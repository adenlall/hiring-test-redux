"use client"
export const dynamic = "force-dynamic";
import AddContent from "@/components/AddContent";
import ManageContent from "@/components/ManageContent";
import { useAppSelector } from "@/hooks";

export default function Home() {
  const { sessiontype } = useAppSelector((state) => state.sessiontype);

  return (
    <main className="container m-auto w-full p-4 bg-base-300 mt-8 rounded-box">
      <h2 className="bg-base-200 p-2 w-full rounded-box font-bold text-2xl text-center mb-4">Home Page</h2>
      {
        sessiontype === 'writer'?
        <AddContent/> : <ManageContent/>
      }
    </main>
  );
}
