import LayoutMenu from "../../components/LayoutMenu"
import SearchableList from "../../components/SearchableList"
import { NebulaIcon } from "@sonr-io/nebula-react"
import EmptyList from "./components/EmptyList"
import {
  ListTypes,
  SearchableListItem,
  SchemaMeta,
  Bucket,
} from "../../utils/types"
import LoadingCircleSvg from "../../assets/svgs/LoadingCircle"
import { Dispatch, SetStateAction } from "react"

interface ObjectsPageComponentProps {
  schemas: Array<SchemaMeta>
  buckets: Array<Bucket>
  selectedSchema: string
  selectedBucket: string
  setSelectedSchema: Dispatch<SetStateAction<string>>
  setSelectedBucket: Dispatch<SetStateAction<string>>
  openNewObjectModal: () => void
  loading: boolean
  schemaCount: number
  bucketCount: number
  list: Array<SearchableListItem>
}

const ObjectsPageComponent = ({
  schemas,
  buckets,
  selectedSchema,
  selectedBucket,
  setSelectedSchema,
  setSelectedBucket,
  openNewObjectModal,
  loading,
  list,
  schemaCount,
  bucketCount,
}: ObjectsPageComponentProps) => {
  return (
    <LayoutMenu>
      <div className="py-14 px-10">
        <div className="flex justify-between items-center gap-4 mb-8">
          <h1 className="text-custom-3xl tracking-custom-x2tighter font-extrabold text-default">
            Objects
          </h1>

          <div className="flex w-full justify-end gap-4">
            {schemaCount > 0 && (
              <div className="flex w-40 flex-col items-start justify-center">
                <div className="mb-2">Schema</div>

                <div className="relative pointer-events-none select-none border border-default-border rounded-md w-full cursor-pointer flex justify-between">
                  <select
                    className="appearance-none py-2 px-3 rounded-md pointer-events-auto cursor-pointer w-full"
                    onChange={(event) => setSelectedSchema(event.target.value)}
                    value={selectedSchema}
                  >
                    {schemas.map((item) => (
                      <option key={item.did} value={item.did}>
                        {item.label}
                      </option>
                    ))}
                    <option key="all_schemas" value="">
                      All
                    </option>
                  </select>

                  <NebulaIcon
                    iconName="ArrowSquareDown"
                    iconType="duotone"
                    className="w-8 h-8 pointer-events-none select-none absolute right-0 top-1"
                  />
                </div>
              </div>
            )}

            {bucketCount > 0 && (
              <div className="flex w-40 flex-col items-start justify-center">
                <div className="mb-2">Bucket</div>

                <div className="relative pointer-events-none select-none border border-default-border rounded-md w-full cursor-pointer flex justify-between">
                  <select
                    className="appearance-none py-2 px-3 rounded-md pointer-events-auto cursor-pointer w-full"
                    onChange={(event) => setSelectedBucket(event.target.value)}
                    value={selectedBucket}
                  >
                    {buckets.map((item) => (
                      <option key={item.did} value={item.did}>
                        {item.label}
                      </option>
                    ))}
                  </select>

                  <NebulaIcon
                    iconName="ArrowSquareDown"
                    iconType="duotone"
                    className="w-8 h-8 pointer-events-none select-none absolute right-0 top-1"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="w-full flex justify-center mt-20">
            <div className="w-28 animate-spin flex justify-center items-center">
              <LoadingCircleSvg />
            </div>
          </div>
        )}

        <div className={`${loading ? "hidden" : ""}`}>
          {list.length > 0 ? (
            <SearchableList
              handleOpenModal={openNewObjectModal}
              initialList={list}
              type={ListTypes.object}
              loading={loading}
            />
          ) : (
            <EmptyList
              openNewObjectModal={openNewObjectModal}
              loading={loading}
              schemaCount={schemaCount}
              bucketCount={bucketCount}
            />
          )}
        </div>
      </div>
    </LayoutMenu>
  )
}

export default ObjectsPageComponent
