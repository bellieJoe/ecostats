import { Button, message } from "antd";
import { useAuthStore } from "../stores/useAuthStore";
import { FormEnum } from "../types/forms/formNameEnum";
import { GenericFormFieldV3 } from "../types/forms/GenericFormTypes";
import { useState } from "react";
import { requestReport } from "../services/api/formsApi";
import { parseResError } from "../services/errorHandler";
import CustomReportGenerator from "./GenericFormReportFilter";

const RequestReportForm = (
    {
        formName, 
        fields
    } : {
        formName : FormEnum
        fields : GenericFormFieldV3[]
    }
) => {

    const [messageApi, contextHandler] = message.useMessage();
    const authStore = useAuthStore();
    const [open, setOpen] = useState(false);

    const handleSubmit =  async (title, filter, inclusions) => {
        console.log({
            title : title,
            filters : filter,
            fields : inclusions,
            form_name : formName,
            requested_by : authStore.user?._id
        });

        try {
            await requestReport({
                title : title,
                filters : filter,
                fields : inclusions,
                form_name : formName,
                requested_by : authStore.user?._id
            });
            messageApi.success("New report request successfully submitted.")
        } catch (error) {
            messageApi.error(parseResError(error).msg)
        }
    }

    return (
        <>
            { contextHandler }
            <Button onClick={() => setOpen(true)}>Request Custom Report</Button>
            <CustomReportGenerator 
            visible={open} 
            fields={fields} 
            onClose={() => setOpen(false)} 
            onSubmit={handleSubmit}/>
        </>
    )
}

export default RequestReportForm;