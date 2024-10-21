
import Title from "antd/es/typography/Title";
import { land_1_genericFormFields } from "../../../../components/Reports/Forms/Land/Land_Table_1";
import { FormEnum } from "../../../../types/forms/formNameEnum";
import RequestReportForm from "../../../../components/RequestReportForm";



const Land1CustomReport = () => {

    return (
        <>
            <Title level={4}>Requests</Title>
            <RequestReportForm fields={land_1_genericFormFields} formName={FormEnum.LAND_1} />
        </>
    )
}

export default Land1CustomReport;