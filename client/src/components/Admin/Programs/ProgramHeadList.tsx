import { Button, Drawer, Flex, List, message } from "antd";
import Title from "antd/es/typography/Title";
import { useProgramHeadStore } from "../../../stores/useProgramStore";
import { useEffect, useState } from "react";
import { getProgramHeads, removeProgramHead } from "../../../services/api/programApi";
import { parseResError } from "../../../services/errorHandler";

const ProgramHeadList = () => {

    const programHeadStore = useProgramHeadStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isRemoving, setIsRemoving] = useState(false)

    useEffect(() => {
        setOpen(!!programHeadStore.programId)

        if(programHeadStore.programId){
            setLoading(true)
            getProgramHeads(programHeadStore.programId!)
            .then(res => {
                programHeadStore.setHeads(res.data)
            })
            .catch(err => messageApi.error("Unexpected error occured while loading the program heads"))
            .finally(() => setLoading(false))
        }

    }, [programHeadStore.programId]);

    const removehandler = (userId:string) => {
        setLoading(true)
        removeProgramHead(programHeadStore.programId!, userId)
        .then(res => {
            programHeadStore.setHeads(programHeadStore.heads.filter(p => p._id != userId))
            messageApi.success("Program head successfully removed")
        })
        .catch(err => {
            messageApi.error(parseResError(err).msg)
        })
        .finally(() => setLoading(false))
    }


    return (
        <>
            {contextHolder}
            <Drawer loading={loading} open={open} onClose={() => programHeadStore.clear()}>
                <p className="mb-2"><span className="font-semibold">Program/Division Name :</span><br /> {programHeadStore.name}</p>
                <Title level={5}>Program Heads</Title>
                <List
                dataSource={programHeadStore.heads}
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

export default ProgramHeadList;