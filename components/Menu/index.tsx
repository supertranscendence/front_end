import React , {CSSProperties, FC, useCallback} from "react";
import {CloseModalButton, CreateMenu } from "./style";

interface Props{
	show: boolean;
	onCloseModal: ()=>void;
	style:CSSProperties;
	closeButton?:boolean;
	children:any;
}
const Menu : FC<Props> = ({children, style,show, onCloseModal, closeButton}) => {

const stopPropagation = useCallback((e:any)=>{
	e.stopPropagation();
},[]);

	return (
		<CreateMenu onClick={onCloseModal}>x
			<div style={style} onClick={stopPropagation}>
			{closeButton && <CloseModalButton onClick={onCloseModal}>X</CloseModalButton>}
			{children}
			</div>
		</CreateMenu>
	)
}
Menu.defaultProps ={
	closeButton: true
}

export default Menu;