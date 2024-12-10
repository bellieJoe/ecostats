import { Flex, Image, Layout } from "antd";
import forestry_logo from "../../assets/forestry.png"
import bio_logo from "../../assets/bio.png"
import land_logo from "../../assets/land.png"
import logo from "../../assets/logo.png"
import Title from "antd/es/typography/Title";
import {PeopleAltOutlined, PeopleAltTwoTone, PhonelinkOutlined, PhonelinkTwoTone, SettingsSuggestTwoTone, SsidChartTwoTone} from '@mui/icons-material';

const LandingPage = () => {
    return (
        <Layout className="h-full overflow-scroll">
            <Flex className="my-20" justify="center" align="baseline" gap={20}>
                <div className="w-90" style={{width: 200}}>
                    <Image src={forestry_logo} /> 
                    <Title className="text-center" level={5}>Forestry Management</Title>
                </div>
                <div className="w-90" style={{width: 200}}>
                    <Image src={bio_logo} /> 
                    <Title className="text-center" level={5}>Biodiversity Management</Title>
                </div>
                <div className="w-90" style={{width: 200}}>
                    <Image className="w-full" src={land_logo} width={200} height={200} /> 
                    <Title className="text-center" level={5}>Land Management</Title>
                </div>
            </Flex>

            <div className="my-20">
                <Flex justify="center" gap={20}>
                    <div className="w-28 text-center">
                        <PeopleAltTwoTone className="text-center mx-auto" sx={{fontSize:100}} />
                        <p className="text-center font-semibold">Statistical Focal  Registration</p>
                    </div>
                    <div className="w-28 text-center">
                        <PhonelinkTwoTone className="text-center" sx={{fontSize:100}} />
                        <p className="text-center font-semibold">Entering information or updating records</p>
                    </div>
                    <div className="w-28 text-center">
                        <SettingsSuggestTwoTone className="text-center" sx={{fontSize:100}} />
                        <p className="text-center font-semibold">Customized files and Reports</p> 
                    </div>
                    <div className="w-28 text-center">
                        <SsidChartTwoTone className="text-center" sx={{fontSize:100}} />
                        <p className="text-center font-semibold">Reports and Visualization</p>
                    </div>
                </Flex>
                <Title className="text-center font-bold mt-4" level={4}>FEATURES AND FUNCTIONS</Title>
            </div>

            <Flex gap={100} className="mx-auto my-20" align="center" justify="center" style={{maxWidth: 800,}}>
                <div>
                    <Title level={4} >About Us</Title>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio magni nesciunt harum amet aspernatur, fugit quidem consectetur! Recusandae magnam culpa tenetur quo beatae voluptatum, possimus suscipit officiis labore similique.</p>
                </div>
                <div>
                    <Image src={logo} />
                </div>
            </Flex>
        </Layout>
    )
}

export default LandingPage;