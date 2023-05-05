import FileInput from "@/app/components/form/FileInput"
import FileInputWrapper from "@/app/components/form/FileInputWrapper"

export default function audited_account_doc() {
  const [data, setData] = useState({
    partner_uuid: "",
    category_uuid: "",
    field: "",
    audited_account_1_doc: {},
    audited_account_1_file: null,
  })

  return (
    <div>
      <FileInputWrapper>
        <FileInput
          id="audited_account_1_file"
          doc_id="audited_account_1_doc"
          label="Audited account 1"
          value={data.audited_account_1_doc}
          onChange={handleFormChange}
          errors={errors}
          disabled={isMasterData || partner?.contract_status !== "not_started"}
        />
      </FileInputWrapper>
    </div>
  )
}
