import { addDefaultFieldsToObjectsList } from "../../utils/mappings"
import {
	ListTypes,
	SchemaMeta,
	SearchableListType,
	SearchableListItem,
	SonrObject,
	objectsSelectionCheckbox,
} from "../../utils/types"
import SearchableList from "../SearchableList"

interface CheckboxListGroupComponentProps {
	schema: SchemaMeta
	list: SonrObject[]
	onChangeMainCheckbox: () => void
	mainCheckboxIsChecked: boolean
	onChange: (cid: string, checked: boolean) => void
	toggleOpen: Function
	checkboxes: objectsSelectionCheckbox[]
	isOpen: boolean
}

interface renderCheckboxProps {
	checkbox: objectsSelectionCheckbox
	cid: string
}

function CheckboxListGroupComponent({
	schema,
	list,
	onChangeMainCheckbox,
	mainCheckboxIsChecked,
	onChange,
	checkboxes,
	isOpen,
	toggleOpen,
}: CheckboxListGroupComponentProps) {
	function renderCheckbox({ checkbox, cid }: renderCheckboxProps) {
		return (
			<div>
				<input
					checked={checkbox.checked}
					type="checkbox"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						onChange(cid, event.target.checked)
					}
				/>
			</div>
		)
	}

	function mapToListFormat(
		objects: SonrObject[],
		schemaDid: string
	): SearchableListType {
		const newList = objects.map(
			({ cid, data }: SonrObject): SearchableListItem => {
				const listItem: SearchableListItem = {}
				const checkbox = checkboxes.find(
					(checkbox) =>
						checkbox.cid === cid && checkbox.schemaDid === schema.did
				)
				if (checkbox) {
					listItem[""] = {
						text: "",
						Component: () => renderCheckbox({ checkbox, cid }),
						shrinkColumn: true,
					}
				}

				return addDefaultFieldsToObjectsList({
					fields: data,
					cid,
					schemaDid,
					listItem,
				})
			}
		)

		return newList
	}

	return list.length === 0 ? (
		<></>
	) : (
		<div className="flex flex-col justify-start items-start mb-4 px-2">
			<div
				className={`flex w-full
				${
					isOpen
						? "rounded-t-md text-white bg-surface-button-subtle-hovered"
						: "bg-surface-button-subtle rounded-md"
				}
			`}
			>
				<label className="flex items-center gap-4 px-4">
					<input
						type="checkbox"
						checked={mainCheckboxIsChecked}
						onChange={onChangeMainCheckbox}
					/>
					<span className="block">{schema.label}</span>
				</label>
				<div
					onClick={() => toggleOpen()}
					className="h-10 w-full cursor-pointer"
				/>
			</div>
			<div className={`w-full ${!isOpen ? "hidden" : ""}`}>
				<SearchableList
					hideSearchBar={true}
					initialList={mapToListFormat(list, schema.did)}
					type={ListTypes.object}
					loading={false}
				/>
			</div>
		</div>
	)
}

export default CheckboxListGroupComponent
