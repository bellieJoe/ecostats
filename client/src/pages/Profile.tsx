import Title from "antd/es/typography/Title";
import RouteGuard from "../components/Guards/RouteGuard"
import { Avatar, Card, Flex } from "antd";
import { useAuthStore } from "../stores/useAuthStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import Case from "case";
import { useEffect, useState } from "react";
import { parse } from "path";
import { parseResError } from "../services/errorHandler";
import { getByProgram, getFocalPersons, getUnitsByQuery } from "../services/api/unitApi";
import { getProgramByQuery } from "../services/api/programApi";
import { focalPersonGetByQuery } from "../services/api/focalPersonApi";

const Profile = () => {

    const authStore = useAuthStore();
    const [membership, setMembership] = useState<string[]>([]);
    const arrayToString = (arr) => arr.length > 0 ? arr.join(', ') : 'No assigned Division and Unit';

    const initUserMembership = async () => {
        try {
            setMembership([]);
            if(authStore.user?.role == "chief") {
                let m : any = [];
                const unit = await getUnitsByQuery({unitHead: authStore.user?._id, deletedAt: null}, ["programId"]);
                m = [...unit.data.map(a => `Head of Unit ${a.name}`)];
                const program = await getProgramByQuery({programHead: authStore.user?._id, deletedAt: null}, []);
                m = [...program.data.map(a => `Head of Division ${a.name}`)];
                console.log(m)
                setMembership(m);
                return;
            }
            if(authStore.user?.role == "focal") {
                const res  = await focalPersonGetByQuery(
                    {
                        userId : authStore.user._id, 
                        deletedAt: null
                    }, 
                    [
                        {
                            path : "unitId",
                            populate : {
                                path : "programId"
                            }
                        }
                    ]);
                setMembership([
                    ...res.data.map(a => `${a.position} of Unit: ${a.unitId.name} under Division: ${a.unitId.programId.name}`)
                ])
                return;
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderChiefMembership = () => {
        if(authStore.user?.role != "chief") {
            return <></>
        }
        return (
            <Card className="mb-4">
                <Title level={5}>Designation/s</Title>
                <p className="text-gray-500">  { arrayToString(membership)} </p>
            </Card>
        )
    }

    const renderFocalMembership = () => {
        if(authStore.user?.role != "focal") {
            return <></>
        }
        return (
            <Card className="mb-4">
                <Title level={5}>Designation/s</Title>
                <p className="text-gray-500">  { arrayToString(membership)} </p>
            </Card>
        )
    }

    useEffect(() => {
        initUserMembership();
    }, [authStore.user]);
    
    return (
        <RouteGuard>
            <div className="h-full bg-gray-100 p-4">
                <div style={{maxWidth: 800}} className="mx-auto">
                    <Title level={2}>User Profile</Title>
                    <Card className="mb-4">
                        <Flex gap={30} align="center">
                            <Avatar size={80} className="cursor-pointer " src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${authStore.user?.name}`} /> 
                            <div>
                                <Title level={4}>{authStore.user?.name}</Title>
                                <p className="text-gray-500"><FontAwesomeIcon className="me-2" icon={faEnvelope} /> {authStore.user?.email}</p>
                                <p className="text-gray-500"><FontAwesomeIcon className="me-2" icon={faUser} />  {Case.title(authStore.user?.role!)} </p>
                                
                            </div>
                        </Flex>
                    </Card>

                    {renderChiefMembership()}
                    {renderFocalMembership()}
                </div>
            </div>  
        </RouteGuard>
    )
}

export default Profile;