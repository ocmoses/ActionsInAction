// "use client"

import RemoteEndpoints from "@/app/modules/endpoints";
import Button from "@/app/components/form/Button";
import TextInput from "@/app/components/form/TextInput";
import useErrors from "@/hooks/useErrors";
import FormErrors from "@/app/components/FormErrors";
import usePartners from "@/hooks/usePartners";
import { useState, useEffect } from "react";
import { TailSpinPreloader } from "@/app/components/Icons";
import { complianceRequirements } from "@/app/modules/constants";
import {
  filterFields,
  filterComplianceRequirements,
  filterApprovalFields,
} from "@/app/modules/utilities";

export default function Text({ data, setShowModal }) {
  const { updatePartner } = usePartners();
  const [{ errors, setError, success, setSuccess, removeError, clearErrors }] =
    useErrors(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    clearErrors();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearErrors();
    try {
      setSaving(true);
      setSaved(false);

      if (!formdata.field_value) {
        setSaving(false);
        return setError({ update: "Please enter a value" });
      }

      var headers = new Headers();
      headers.append("apiKey", process.env.NEXT_PUBLIC_APIKEY);
      headers.append("Content-Type", "application/x-www-form-urlencoded");

      var urlEncoded = new URLSearchParams();
      urlEncoded.append("partner_uuid", formdata.partner_uuid ?? "");
      urlEncoded.append("category_uuid", formdata.category_uuid ?? "");
      urlEncoded.append("category_stage", formdata.category_stage ?? "");
      urlEncoded.append("field_value", formdata.field_value ?? "");
      urlEncoded.append("field", data.field);
      urlEncoded.append("shortcode_uuid", data.shortcode_uuid ?? "");

      var requestOptions = {
        method: "POST",
        headers: headers,
        body: urlEncoded,
        redirect: "follow",
      };

      const response = await fetch(
        RemoteEndpoints.PARTNER_UPDATE,
        requestOptions
      ).catch((e) => {
        setSaving(false);
        return setError({
          update: e.message,
        });
      });
      if (!response) {
        setSaving(false);
        return setError({
          update:
            "Something went wrong. Please check your connection and try again",
        });
      }
      const results = await response.json();
      const { success, data: Data } = results;
      if (!success) {
        setSaving(false);
        return setError({
          update: Data.message,
        });
      }
      setSaving(false);
      setSaved(true);
      updatePartner(Data.partner);
      filterFields(Data.partner);
      filterComplianceRequirements(Data.partner);
      filterApprovalFields(Data.partner);
      return setSuccess("Detail updated successfully");
    } catch (e) {
      setSaving(false);
      return setError({
        update: e.message,
      });
    }
  };
  const handleChange = (e) => {
    removeError(data.field);
    setFormdata((prev) => ({ ...prev, field_value: e.target.value }));
  };

  const [formdata, setFormdata] = useState({
    partner_uuid: data.partner_uuid,
    category_uuid: data.category_uuid,
    category_stage: data.category_stage,
    field: data.field,
    field_value: data.field_value,
  });

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="mb-6">
        {success && <FormErrors success={success} />}
        {errors && <FormErrors error={errors.update} />}
      </div>
      <TextInput
        id={data.field}
        label={complianceRequirements[data.category_stage][data.field]?.title}
        value={formdata.field_value}
        onChange={handleChange}
        errors={errors}
      />
      <div className="items-center justify-end gap-3 mt-3 flex">
        {saving ? (
          <TailSpinPreloader width={40} height={40} fill="#efb703" />
        ) : (
          <>
            <Button
              type="button"
              onClick={(e) => setShowModal(false)}
              label={`${saved ? "Finish" : "Cancel"} `}
              outline="yes"
              noicon="yes"
              outlinecolor="border-white/80"
              textsizecss="inline-flex text-[14px] whitespace-nowrap"
              paddingclass="pl-4 pr-3 py-1"
            />
            {!saved && (
              <Button
                onClick={handleSubmit}
                label={`${saved ? "Update" : "Save"}`}
                textsizecss="inline-flex text-[14px] whitespace-nowrap"
                paddingclass="pl-4 pr-3 py-1"
              />
            )}
          </>
        )}
      </div>
    </form>
  );
}
