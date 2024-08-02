"use client"
import { useState, type FormEvent, ChangeEvent } from "react";
import Publish from "./Icons/Publish";
import Trash from "./Icons/Trash";
import { saveImage } from "@/db";
import { useAppDispatch } from "@/hooks";
import { setContent } from "@/redux/slices/content.slice";
import toast from "react-hot-toast";

const MAX_SIZE = 13 // in Mb

export default function AddContent() {

    const dispatch = useAppDispatch();
    const [image, setImage] = useState();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!image) return;
            const uuid = await saveImage({
                buffer: image
            });
            dispatch(setContent({
                title: (e.target as any).title.value,
                body: (e.target as any).body.value,
                image: uuid,
                sensitive: (e.target as any).sensitive.value
            }));
            toast.success("your content list has been updated!");
        } catch (error: any) {
            toast.error("We can't update your content list!");
            toast.error(error.message);
        }
    }


    const handleImage = async (e: any) => {
        const image = e.target.files[0];
        if (image.size >= (MAX_SIZE * 1024 * 1024)) {
            console.log(image.size, MAX_SIZE);
            toast.error("you pass the max size " + MAX_SIZE + " Mb");
            return;
        }
        const arrayBuffer = await image.arrayBuffer();
        setImage(arrayBuffer);
    }

    return <form onSubmit={async (e) => await handleSubmit(e)} className="space-y-4">
        <h1 className="text-3xl font-bold">Add Content</h1>


        <label className="form-control">
            <div className="label">
                <span className="label-text">Title</span>
            </div>
            <input
                name="title"
                className="input input-bordered"
                placeholder="Content Title"
                required minLength={5} maxLength={50}
            />
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Pick a Image Header</span>
            </div>
            <input
                name="image"
                required
                onChange={handleImage}
                accept="image/*"
                type="file"
                className="file-input file-input-primary file-input-bordered w-full max-w-xs"
            />
            <div className="label">
                <span aria-hidden={true} className="label-text-alt">png jpg jpeg types</span>
            </div>
        </label>

        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Sensitive data</span>
            </div>
            <input
                name="sensitive"
                className="input input-bordered"
                placeholder="password..."
                required minLength={2} maxLength={50}
            />
            <div className="label">
                <span className="label-text-alt">This field is encrypted before stored in the database</span>
            </div>
        </label>

        <label className="form-control">
            <div className="label">
                <span className="label-text">Content</span>
            </div>
            <textarea
                name="body"
                required minLength={5} maxLength={5000}
                className="textarea textarea-bordered h-24"
                placeholder="Content Body"
            />
            <div className="label">
                <span className="label-text">max 5000 charachter</span>
            </div>
        </label>

        <div className="flex flex-wrap gap-4">
            <button type="submit" className="btn btn-success">
                <Publish
                    className="h-6 w-6"
                />
                Publish
            </button>
            <button className="btn btn-error">
                <Trash
                    className="h-6 w-6"
                />
                Clear
            </button>
        </div>

    </form>
}