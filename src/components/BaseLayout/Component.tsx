import { useContext, useRef } from "react"
import AppModal from "../AppModal"
import SideMenu from "../SideMenu"
import useDetectOutsideClick from "../../hooks/useDetectOutsideClick"
import { AppModalContext } from "../../contexts/appModalContext/appModalContext"

interface BaseLayoutComponentProps {
	isLogged: boolean
	children: any
}

function BaseLayoutComponent({ isLogged, children }: BaseLayoutComponentProps) {
	const { closeModal } = useContext(AppModalContext)
	const modalParentRef = useRef(null)

	useDetectOutsideClick({ ref: modalParentRef, callback: closeModal })

	const getModalParent = () => modalParentRef.current

	return (
		<div className="flex">
			{isLogged && <SideMenu />}
			<div className="w-full relative" id="test" ref={modalParentRef}>
				{children}
			</div>
			<AppModal getModalParent={getModalParent} />
		</div>
	)
}

export default BaseLayoutComponent
