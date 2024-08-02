"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteContentByIndex } from "@/redux/slices/content.slice";
import Trash from "./Icons/Trash";
import Item from "./Item";

export default function ManageContent() {

    const { content } = useAppSelector((state) => state.content);
    const dispatch = useAppDispatch();

    return <ul>

        <h1 className="text-3xl font-bold">Content List</h1>

        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Sensitive</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {JSON.parse(content?.data)?.map((item, index) => (
                        <Item item={item} key={index}
                            actions={<button onClick={() => dispatch(deleteContentByIndex(index))} className="btn btn-square">
                                <Trash className="w-8 h-8" />
                            </button>}
                        />
                    ))}
                </tbody>
                {/* foot */}
                <tfoot>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Sensitive</th>
                        <th>delete</th>
                    </tr>
                </tfoot>
            </table>
        </div>

    </ul>

}


