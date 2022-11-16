import { Dispatch, SetStateAction, useCallback, useState } from "react"

type ReturnType<T =any>  = [T, (e: any) =>void, Dispatch<SetStateAction<T>>];
// const useInput = (initData : any) =>{
const useInput = <T = any>(initData : T) : ReturnType<T> =>{
	const [value, setValue] = useState(initData);
	const handler = useCallback((e) =>{
		setValue(e.target.value);
	}, []);
	return [value, handler, setValue]
}
export default useInput;