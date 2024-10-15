import TableOfContents from "../../../../components/Forms/TableOfContents";


const LandTOC = () => {
    const contents = [
        { title: "Table 1", name : "Land Area", url : "/app/land/land_1" },
        { title: "Table 2", name : "Patrimonial Properties as of CY 2023", url : "/app/land/land_2" },
    ]
    return (
        <>
            <TableOfContents contents={contents} />
        </>
    )
}

export default LandTOC;