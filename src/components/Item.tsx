"use client";
import { ReactNode, useEffect, useState } from "react";
import { getImage } from "@/db";
import { decodeString } from "@/crypto";

export default function Item({ actions, item }: {
    actions: ReactNode,
    item: {
        image: string,
        title: string,
        body: string,
        sensitive: string
    }
}) {

    const [imageSrc, setImageSrc] = useState("");
    const [decrypted, setdDecrypted] = useState(item.sensitive);
    useEffect(() => {
        getImageBuffer();
    }, []);


    async function getImageBuffer() {
        const result = await getImage(item.image);
        const blob = new Blob([result as Blob]);
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
    }

    return <tr>
        <td>
            <div className="flex items-center gap-3">
                <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                        <img
                            src={imageSrc}
                            alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </div>
        </td>
        <td>
            {item.title}
        </td>
        <td>{item.body}</td>
        <td onClick={()=>{
            setdDecrypted(decodeString(item.sensitive))
        }} className="cursor-pointer">
            <div className="tooltip tooltip-bottom" data-tip={"click to decrypt"}>
                {decrypted}
            </div>
        </td>
        <th>
            {actions}
        </th>
    </tr>;
};
