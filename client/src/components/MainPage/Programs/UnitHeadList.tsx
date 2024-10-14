import { Button, Drawer, Flex, List, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { parseResError } from "../../../services/errorHandler";
import { useUnitHeadStore } from "../../../stores/useUnitStore";
import { getUnitHeads, removeUnitHead } from "../../../services/api/unitApi";

const UnitHeadList = () => {

    const unitHeadStore = useUnitHeadStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        setOpen(!!unitHeadStore.unitId)

        if(unitHeadStore.unitId){
            setLoading(true)
            getUnitHeads(unitHeadStore.unitId!)
            .then(res => {
                unitHeadStore.setHeads(res.data)
            })
            .catch(err => messageApi.error("Unexpected error occured while loading the unit heads"))
            .finally(() => setLoading(false))
        }

    }, [unitHeadStore.unitId]);

    const removehandler = (userId:string) => {
        setLoading(true)
        removeUnitHead(unitHeadStore.unitId!, userId)
        .then(res => {
            unitHeadStore.setHeads(unitHeadStore.heads.filter(p => p._id != userId))
            messageApi.success("Unit head successfully removed")
        })
        .catch(err => {
            messageApi.error(parseResError(err).msg)
        })
        .finally(() => setLoading(false))
    }


    return (
        <>
            {contextHolder}
            <Drawer loading={loading} open={open} onClose={() => unitHeadStore.clear()}>
                <p className="mb-2"><span className="font-semibold">Unit Name :</span><br /> {unitHeadStore.name}</p>
                <Title level={5}>Unit Heads</Title>
                <List
                dataSource={unitHeadStore.heads}
                renderItem={(item) => {
                    return (
                        <List.Item>
                            <Flex align="center" justify="space-between" className="w-full">
                                {item.name}
                                <Button color="danger" variant="solid" onClick={() => removehandler(item._id)} >Remove</Button>
                            </Flex>
                        </List.Item>
                    )
                }} />
            </Drawer>
        </>
    )
}

export default UnitHeadList;