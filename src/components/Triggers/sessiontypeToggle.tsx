"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { toggleType } from "@/redux/slices/sessiontype.slice";

const SessionTypeToggle = () => {

  const dispatch = useAppDispatch();
  const { sessiontype } = useAppSelector((state) => state.sessiontype);

  // handle changes
  const handleChange = (event:any) => {
    dispatch(toggleType(event.target.value));
  };

  return <select
    value={sessiontype}
    onChange={handleChange}
    className="select select-sm max-w-xs"
  >
    <option value={"writer"}>writer</option>
    <option value={"publisher"}>publisher</option>
  </select>

};

export default SessionTypeToggle;
