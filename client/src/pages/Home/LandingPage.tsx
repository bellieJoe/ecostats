import { Col, Flex, Image, Layout, Row } from "antd";
import forestry_logo from "../../assets/forestry.png"
import bio_logo from "../../assets/bio.png"
import land_logo from "../../assets/land.png"
import logo from "../../assets/logo.png"
import Title from "antd/es/typography/Title";
import {PeopleAltOutlined, PeopleAltTwoTone, PhonelinkOutlined, PhonelinkTwoTone, SettingsSuggestTwoTone, SsidChartTwoTone} from '@mui/icons-material';

const LandingPage = () => {
    return (
        <Layout className="h-full overflow-scroll">
            <Row className="my-20" justify="center" gutter={16}>
                <Col className="w-90" style={{width: 200}}>
                    <Image src={forestry_logo} /> 
                    <Title className="text-center" level={5}>Forestry Management</Title>
                </Col>
                <Col className="w-90" style={{width: 200}}>
                    <Image src={bio_logo} /> 
                    <Title className="text-center" level={5}>Biodiversity Management</Title>
                </Col>
                <Col className="w-90" style={{width: 200}}>
                    <Image className="w-full" src={land_logo} width={200} height={200} /> 
                    <Title className="text-center" level={5}>Land Management</Title>
                </Col>
            </Row>

            <Row className="my-20 justify-center">
                <Col className="w-full max-w-lg">
                    <Title className="text-center font-bold mt-4" level={4}>FEATURES AND FUNCTIONS</Title>
                    <Row justify="space-evenly">
                        <Col  className="w-28 text-center">
                            <PeopleAltTwoTone className="text-center mx-auto" sx={{fontSize:100}} />
                            <p className="text-center font-semibold">Statistical Focal  Registration</p>
                        </Col>
                        <Col className="w-28 text-center">
                            <PhonelinkTwoTone className="text-center" sx={{fontSize:100}} />
                            <p className="text-center font-semibold">Entering information or updating records</p>
                        </Col>
                        <Col className="w-28 text-center">
                            <SettingsSuggestTwoTone className="text-center" sx={{fontSize:100}} />
                            <p className="text-center font-semibold">Customized files and Reports</p> 
                        </Col>
                        <Col className="w-28 text-center">
                            <SsidChartTwoTone className="text-center" sx={{fontSize:100}} />
                            <p className="text-center font-semibold">Reports and Visualization</p>
                        </Col>
                    </Row>
                </Col>
                
            </Row>

            <Row className="mx-auto my-20" justify="center" gutter={[16, 16]} style={{maxWidth: 800,}}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="flex items-center h-full justify-center">
                        <div>
                            <Title level={4} className="text-center">About Us</Title>
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit odio magni nesciunt harum amet aspernatur, fugit quidem consectetur! Recusandae magnam culpa tenetur quo beatae voluptatum, possimus suscipit officiis labore similique.</p>
                        </div>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="text-center">
                    <Image width={250} src={logo} className="w-full max-w-lg mx-auto" />
                </Col>
            </Row>
        </Layout>
    )
}

export default LandingPage;